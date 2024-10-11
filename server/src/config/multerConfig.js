const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('./cloudinaryConfig')

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'markers',
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
})

const upload = multer({ storage: storage })

module.exports = upload
