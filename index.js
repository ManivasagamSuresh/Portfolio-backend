const express  = require('express');
const env  = require("dotenv").config();
const cors = require("cors")
const app = express();
const nodemailer = require("nodemailer");
const password = process.env.password;


app.use(cors({
    origin : "https://delicate-frangollo-0e3256.netlify.app"
}))

app.use(express.json());



app.post('/sendmail',async(req,res)=>{
    const transporter =await nodemailer.createTransport(
        {
            service : "hotmail",
            auth:{
                user:"manivasagam.suresh@outlook.com",
                pass:`${password}`
            }
        }
    );
    console.log("step1")
    const details = {
        from : "manivasagam.suresh@outlook.com",
        to:'s.kishore123.64@gmail.com',
        subject:"Hi there,i've checked your portfolio, do contact me",
        text:`Name: ${req.body.name}
              Email : ${req.body.email} 
              My Message : ${req.body.message} `
    };
    console.log("step2")
    await transporter.sendMail(details,(err,info)=>{
        if(err){
            console.log(err);
            return
        }
        res.json(true);
        console.log("sent:" + info.response)
    })
    
})

app.listen(process.env.PORT || 5000,()=>{
    console.log('connected')
})