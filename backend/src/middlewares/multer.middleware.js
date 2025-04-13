import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const filePath = path.join(__dirname, '..', 'public', 'temp');
      console.log(process.cwd());
      console.log(filePath);
      cb(null, filePath)
    },
    filename: function (req, file, cb) {
      console.log(process.cwd());
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  
export const upload = multer({ storage: storage , limits: { fileSize: 10 * 1024 * 1024 }})