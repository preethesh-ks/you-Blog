require("dotenv").config();
const express = require("express");
const path = require("path");

const authRoute = require("./routes/auth");
const authUser = require("./routes/user")
const authPost = require("./routes/posts")
const authCat = require("./routes/category")


const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const multer = require("multer");


const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use("/images",express.static(path.join(__dirname,"/images")))

main().catch(err => console.log(err));
 async function main() {
    mongoose.set('strictQuery', true);
 //mongoose.connect(process.env.CONNECT_URL);
  mongoose.connect(process.env.CONNECT_URLCAP)
  console.log("connected to mongodb server");
}
 


const storage = multer.diskStorage({
  destination:(req,file,callb)=>{
    callb(null,"images")
  },
  filename:(req,file,callb)=>{
    // callb(null,"file.png")
    callb(null,req.body.name)
  }
})

const upload = multer({
  storage:storage
})

app.post("/upload",upload.single("file"),(req,res)=>{
  res.status(200).json("file has been uploaded")
})
app.use("/auth",authRoute)
app.use("/users",authUser)
app.use("/posts",authPost)
app.use("/category",authCat)

app.listen("5000",()=>{
    console.log("backend running in port 5000");
})