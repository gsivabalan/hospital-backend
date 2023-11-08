const express = require('express');
const mongoose=require('mongoose')
const cors=require('cors');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
const userRoute =require('./routes/user.js')
const hospitalRoute=require('./routes/hospital.js')


dotenv.config()
const app=express()

const port=process.env.PORT || 8000;
const corsOptions ={
    origin:true,
    Credentials:true,

}
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
  
//database connection
mongoose.set("strictQuery",false);
const uri = "mongodb+srv://siva90balan:siva1234@cluster0.hxxvppo.mongodb.net/?retryWrites=true&w=majority";
const connect=async()=>{
    try{
        await mongoose.connect(uri,
            {
                useNewUrlParser:true,
                useUnifiedTopology:true
            })

            console.log('MongoDb database connected')
    } catch(err){
      console.log('MongoDB database connection failed')
    }
}


//for testing
app.get("/",(req,res)=>{
    res.send("api is working good")
})


//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
//login and register
app.use("/api/v1/auth",userRoute);
//Hospital
app.use("/api/v1",hospitalRoute);

app.listen(port,()=>{
    connect();
    console.log('server is listening on port',port)
})