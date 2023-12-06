import AWS from 'aws-sdk'
import { Request, Response, Router } from 'express'
import multer from 'multer'
import cors from 'cors'
const upload = multer()
const router = Router()

AWS.config.update({
  accessKeyId: process.env.AWS_S3_BUCKET_NAME,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
})

const s3 = new AWS.S3()
/* `property/${file.originalname}` */
router.options('/upload/:path(*)', cors());
router.post('/upload/:path(*)',cors() ,upload.array('images', 5), async(req:Request, res:Response) => {
  const files = req.files;
  const path=req.params.path
  /* console.log(path) */
    if (Array.isArray(files)) {
      
      const image = []
      for (const file of files) {
        const totalPath=path+'/'+file.originalname
        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKETNAME || 'defaultBucketName',
          Key: totalPath,
          Body: file.buffer,
          /*  ACL: 'public-read', */
        }
        /* console.log(file) */

        const s3Response = await s3.upload(uploadParams).promise()

        // Get the URL of the uploaded image
        const imageUrl = s3Response.Location
        console.log(imageUrl)
        image.push(totalPath)
        /* s3.putObject(uploadParams, function(err, data) {
          if (err) {
            console.error(err);
          } else {
            console.log('File uploaded successfully.');
          }
        }) */
      }
      res.status(200).send({ imageArray: image })
    }
  }
)

export default router
