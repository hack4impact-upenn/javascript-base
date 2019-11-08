import AWS from "aws-sdk"
import { File, User } from "../../models"
import { AuthenticationError } from "apollo-server";

import { validateUserPermission } from "./model"

import * as dotenv from 'dotenv';
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const resolvers = {
  Query : {
    getFiles : async (parent, { first, cursor, sort, desc }, context) => {
      if(!context.req.userId){
        throw new AuthenticationError("You must be logged in to view files")
      } 

      const currentUser = await User.findById(context.req.userId).populate({
        path: 'files',
        options: {
          sort : {
            [sort]: desc ? -1 : 1 
          },
        }
      });

      const files = await currentUser.files.slice(cursor, cursor + first).map( (file) => ({
        id: file._id.toString(),
        name: file.name,
        type: file.type,
        permissions: file.permissions,
        uploadDate: file.uploadDate
      }))

      return files
    },

    getFile : async (parent, { fileId }, context) => {
      const currentUser = await User.findById(context.req.userId);
      const file = await File.findById(fileId);

      if(validateUserPermission(file, currentUser)){
        const url = s3.getSignedUrl('getObject', {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: fileId,
          Expires: 15,
          ResponseContentDisposition: `attachment;filename=${file.name}`
        })
        return url
      } else {
        return null
      }
    }
  },
  Mutation : {
    uploadFile : async (parent, { file, name, type, permissions }, context) => {
      if(!context.req.userId){
        throw new AuthenticationError("You must be logged in to upload files")
      } 

      const currentUser = await User.findById(context.req.userId);
      const { stream, filename, mimetype, encoding } = await file;
      const newFile = new File({
        name: name,
        permissions: permissions,
        type:  type,
        owner: currentUser,
        uploadDate: new Date()
      });
      currentUser.files.push(newFile);

      newFile.save();
      currentUser.save();
      
      const params = {Bucket: process.env.AWS_S3_BUCKET, Key: newFile.id, Body: stream}
      s3.upload(params, (error, data) => {
        console.log(error)
      })
      return true;
    }
  }
}

export default resolvers;