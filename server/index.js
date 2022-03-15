const express = require("express")
const mongoose = require("mongoose")
const helmet = require("helmet")
const dotenv = require("dotenv")
const morgan = require("morgan")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const messageRoute = require("./routes/messages")
const conversationRoute = require("./routes/conversations")
const multer = require("multer")
const path = require("path")
const app = express()

dotenv.config()

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(
        () => { console.log("Connect to MongoDB") }
    ).catch(err => { console.log(err) })

// with that we don't send get request to our REST api but we open this as directory
app.use('/images', express.static(path.join(__dirname, "public/images")))

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        console.log(req.body)
        cb(null, req.body.name)
    }
})

const upload = multer({storage})
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded succesfully ")
    } catch (err) {
        console.log(err)
    }
})

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messageRoute)

app.listen(8800, () => {
    console.log('xx')

}) 