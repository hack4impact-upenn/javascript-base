import AWS from "aws-sdk"
import { File, User } from "../../models"
import { AuthenticationError } from "apollo-server";

import { fileValidateUserAccess } from "./model"

import * as dotenv from 'dotenv';
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const resolvers = {
  Query : {
    getFiles : async (parent, { page, pageSize, search, orderBy, orderDirection }, context) => {
      if(!context.req.userId){
        throw new AuthenticationError("You must be logged in to view files")
      } 

      const currentUser = await User.findById(context.req.userId)
      const files = (await File.find({ owner: currentUser, $or : [
        { name: {$regex: new RegExp(search), $options: 'i'}},
        { type: {$regex: new RegExp(search), $options: 'i'}}
      ]}).sort({
        [orderBy]: orderDirection == "asc" ? 1 : -1
      })).slice(page * pageSize, (page + 1) * pageSize)

      return files;
    },

    getFile : async (parent, { fileId }, context) => {
      const currentUser = await User.findById(context.req.userId);
      const file =   await File.findById(fileId);

      if( !fileValidateUserAccess(file, currentUser) ){
        return null;
      }

      const params = {
        Bucket: process.env.AWS_S3_FILE_BUCKET,
        Key: fileId,
        Expires: 15,
        ResponseContentDisposition: `attachment;filename="${file.name}"`
      }
      const url = s3.getSignedUrl('getObject', params)
      return url
    },

    getFileCount : async (parent, {}, context) => {
      return (await User.findById(context.req.userId)).files.length
    },
  },
  Mutation : {
    deleteFile : async (parent, { fileId }, context) => {
      if(!context.req.userId){
        throw new AuthenticationError("You must be logged in to upload files")
      } 

      const currentUser = await User.findById(context.req.userId);
      const file = await File.findById(fileId)
      if( !fileValidateUserAccess(file, currentUser) ){
        console.log("User not valid")
        return false;
      }

      const params = {
        Bucket: process.env.AWS_S3_FILE_BUCKET,
        Key: fileId
      }

      const owner = await User.findById(file.owner)
      owner.files = owner.files.filter( (id) => id != fileId);
      owner.save()

      s3.deleteObject(params, (err, data) => {
        if(err) {
          console.log(err);
        }
      });
      await File.remove( {_id: fileId} );
      return true;
    }, 
    uploadFile : async (parent, { file, name, type }, context) => {
      if(!context.req.userId){
        throw new AuthenticationError("You must be logged in to upload files")
      } 

      const currentUser = await User.findById(context.req.userId);
      const { stream, filename, mimetype, encoding } = await file;
      const today = new Date()

      const newFile = new File({
        name: name,
        type:  type,
        owner: currentUser,
        uploadDate: today
      });
      currentUser.files.push(newFile);

      newFile.save();
      currentUser.save();
      
      const params = {
        Bucket: process.env.AWS_S3_FILE_BUCKET, 
        Key: newFile.id, 
        Body: stream
      }

      s3.upload(params, (error, data) => {
        console.log(error)
      })
      return true;
    }
  }
}

export default resolvers;