import multer from 'multer'
import path from 'path'
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'public/images'

        //check if the directory exists, if not, create it
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true })
        }
        cb(null, dir)
    },

    filename: function (req, file, cb) {
        //
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // const fileExtension = path.extname(file.originalname)
        // cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension)

        cb(null,Date.now() + '-' + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

export default upload