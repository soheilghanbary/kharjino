import { S3 } from 'aws-sdk'

const s3 = new S3({
  accessKeyId: process.env.LIARA_ACCESS_KEY,
  secretAccessKey: process.env.LIARA_SECRET_KEY,
  endpoint: process.env.LIARA_ENDPOINT,
})

export const uploadFile = async (file: File) => {
  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME!,
    Key: file.name,
    Body: file,
  }
  return await s3.upload(params).promise() // -> { key , Location }
}

export const removeFile = async (key: string) => {
  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME!,
    Key: key,
  }
  return await s3.deleteObject(params).promise()
}
