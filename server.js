const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const app = express()
const userRoute = require("./routes/users")
const blogRoute = require("./routes/blog")

const port = process.env.PORT

// middleware
app.use(express.json());
app.use("/api/users",userRoute);
app.use("/api/blog",blogRoute);

// connect mongoDB
const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("MongoDB connected")
    } catch (error) {
        throw error;
    }
}
mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB disconnected")
});
connect()

app.listen(port,(req,res)=>{
    console.log("server")
})