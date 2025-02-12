import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const fileUpload = async (filePath) => {

    try {
        const uploadResult = await cloudinary.uploader
           .upload(
               filePath,
               {
                    resource_type: 'auto'
               }
           )
            fs.unlinkSync(filePath)
        return uploadResult
    } catch (error) {
        console.log(error)
        fs.unlink(filePath)
        return null
    }

}

export { fileUpload }
