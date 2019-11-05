import AWS from "aws-sdk"

// const s3 = new AWS.S3({
//   accessKey: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// })

const resolvers = {
  Mutation : {
    uploadFile : async (parent, { file }) => {
      const { stream, filename, mimetype, encoding } = await file;
      console.log(filename)
      return file
    }
  }
}

export default resolvers;