import AWS from "aws-sdk"
import { File, User } from "../../models"
import { AuthenticationError } from "apollo-server";

// const s3 = new AWS.S3({
//   accessKey: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// })

const resolvers = {
  Mutation : {
    uploadFile : async (parent, { file }, context) => {
      if(!context.req.userId){
        throw new AuthenticationError("You must be logged in to upload files")
      } 

      const currentUser = await User.findById(context.req.userId);
      const { stream, filename, mimetype, encoding } = await file;
      const newFile = new File({
        name: filename,
        owner: currentUser
      });
      currentUser.files.push(newFile);

      newFile.save();
      currentUser.save();
      // TODO : Save to AWS
      return true;
    }
  }
}

export default resolvers;