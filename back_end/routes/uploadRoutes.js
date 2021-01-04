import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  },
})

function validateFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeType = fileTypes.test(file.mimetype)

  if(extName && mimeType) {
    return cb(null, true)
  } else {
    cb(new Error('Wrong file format. Only JPG, JPEG, PNG'))
  }
}

const maxSize = 1 * 1024 * 1024; //1MB

const upload = multer({
  storage,
  limits: { 
    fileSize: maxSize, 
    files: 3
  },
  fileFilter: function(req, file, cb) {
    validateFileType(file, cb)
  }
})

router.post('/', upload.fields([{name: 'image', maxCount: 3}]), (req, res) => {
  if(req.files) {
    res.send(req.files.image)
  }
})

export default router