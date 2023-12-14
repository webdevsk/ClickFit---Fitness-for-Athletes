import express from 'express'
import multer from 'multer'
import cors from 'cors'

const app = express()
app.use(cors())

const storage = multer.diskStorage({
    destination: 'upload_images/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.originalname}-${uniqueSuffix}.${file.mimetype.split('/')[1]}`)
    },
})

const upload = multer({ dest: 'upload_images/', storage: storage })

app.post('/upload', upload.array('image'), (req, res) => {
    const files = req.files
    console.log('Uploaded files:', files)

    // Process your uploaded files here
    // (e.g., move them to a different location, resize them, etc.)

    res.send({ message: 'Images uploaded successfully!' })
})

app.listen(3000, () => console.log('Server listening on port 3000'))