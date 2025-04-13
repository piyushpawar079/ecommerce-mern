import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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