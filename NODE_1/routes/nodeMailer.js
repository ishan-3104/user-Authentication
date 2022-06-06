const express = require('express')
const route = express.Router()
require('dotenv').config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')
route.use(bodyParser.json()); 
route.use(bodyParser.urlencoded({ extended: true }));


route.get('/',function(req,res){
    
    res.render('sendMail.ejs')

    
})

route.post('/send',function(req,res){
    console.log(req.body.email)
    console.log(req.body.emailSub)
    console.log(req.body.emailText)
    console.log(req.body.file)

    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
     });

     const mailOptions = {
        from: process.env.EMAIL_USERNAME, // Sender address
        to: req.body.email, // List of recipients
        subject: req.body.emailSub, // Subject line
        text: req.body.emailText, // Plain text body
        
        attachments: [
            { filename: 'download.jpg', path: './download.jpg' }
         ]
   };

    transport.sendMail(mailOptions, function(err, info) {
        if (err) {
        console.log(err)
        } else {
        console.log(info);
        res.send("success")
        }
});
})


module.exports= route