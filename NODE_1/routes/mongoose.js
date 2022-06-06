const express = require('express')
const route = express.Router()
const bodyParser = require('body-parser')
const axios = require('axios')
const cookie = require('cookie-parser')
var mongoose = require('mongoose');
const fs = require('fs')
const path = require('path')
const  cors = require("cors");
const multer = require('multer');
const upload = multer({dest : 'uploads'})
route.use(cors());

route.use(bodyParser.json()); 
route.use(bodyParser.urlencoded({ extended: true }));
route.use(cookie());


var storageFiles = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function(req, file, cb) {
      let ext = file.originalname.substring(
        file.originalname.lastIndexOf("."),
        file.originalname.length
      );
      cb(null, file.originalname + "-" + Date.now() + ext);
    }
  });
  var uploadFiles = multer({ storage: storageFiles });

// var Storage = multer.diskStorage({
//     destination : './public/image',
//     filename:(req,file,cb)=>{
//         cb(null,filename+ "_"+Date.now()+path.extname(file.originalname))
//     }
// })
// route.use(express.static(__dirname+"../public"))

// var uplode = multer({
//     storage:Storage
// }).single('file');

var mongoose = require('mongoose');


mongoose.connect('mongodb+srv://ishanPatel:Ishan3104@cluster0.ikxah.mongodb.net/ishan');
 
var db = mongoose.connection;

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password : String,
    salary:Number,
    file: Array,

})

var User = mongoose.model('User', userSchema, 'auth');

// route.post('/signin',(req,res)=>{
//     var user1 = new User({
//         username : req.body.username,
//         email : req.body.email,
//         password: req.body.password,
//         salary: req.body.salary,
//         file:req.body.file,
//     })
//     user1.save()
//     res.send('data inserted')
// })

route.post('/login',(req,res)=>{
    var username = req.body.username
    var pass = req.body.password
    var isauth = false
   
    User.find({username:username}).then((data)=>{
        if(data[0].password == pass){
            isauth = true
            console.log("login success")
        }
        else{ 
            console.log("login fail")
        }
        return res.status(200).json({message: 'success',auth:isauth , username:username})

    }).catch(()=>{
        return res.status(200).json({message: 'success',auth:isauth , username:username})
    })
    
})



route.post('/update',(req,res)=>{
    
    var username = req.body.name
    User.find({username:username},function(err,data){
        return res.status(200).json({ data : data})
    })
    
})

route.post('/updateone',uploadFiles.array("galary", 10),(req,res)=>{
    // let fileType = req.file.mimetype.split('/')[1]
    // let newFilename = req.file.filename + '.'+ fileType
    
    // fs.rename(path.resolve(process.cwd(), `uploads/${req.file.filename}`), path.resolve(process.cwd(), `uploads/${newFilename}`), (data)=>{
    //     console.log('File Uploaded')
    //     res.send('200')
    // })
    // console.log(newFilename,"filr NAme")
    if(req.files.length > 0){
        console.log(req.files);
    var files = req.files
    var lst = []
    files.map((i)=>{
        lst.push(i.filename)
    })
    console.log(lst)
    var username  = req.body.username
    var email = req.body.email
    var password = req.body.password
    var salary = req.body.salary
    var file = lst
    
    console.log(req.body.username)

        User.updateOne({_id: req.body.id},{username:username , email:email,password:password,salary:salary ,file:file})
       .then((response)=>{
           console.log("updated-1")
           return res.status(200).json({message:response})
       }).catch((error)=>
       {   
           console.log("updated-1")
           // return res.status(500).json({message:error.message})
       })
    }
    else{
        console.log("in Else");
        User.updateOne({_id: req.body.id},req.body)
       .then((response)=>{
           console.log("updated-1")
           return res.status(200).json({message:response})
       }).catch((error)=>
       {   
           console.log("updated-1")
           // return res.status(500).json({message:error.message})
       })
    }
})

route.get('/display',(req,res)=>{
    User.find()
    .then((data)=>{
        return res.status(200).json({data:data})
    })
    .catch((err)=>{
        return res.status(500).json({message:error.message})
    })
})

// route.post('/uploadFile', upload.single('avatar'), (req,res)=>{
    
//     let fileType = req.file.mimetype.split('/')[1]
//     let newFilename = req.file.filename + '.'+ fileType
    
//     fs.rename(path.resolve(process.cwd(), `uploads/${req.file.filename}`), path.resolve(process.cwd(), `uploads/${newFilename}`), (data)=>{
//         console.log('File Uploaded')
//         res.send('200')
//     })
//     console.log(newFilename,"filr NAme")
//     var User1 = new User ({
//         username : req.body.username,
//         email : req.body.email,
//         password : req.body.password,
//         salary : req.body.salary,
//         file : newFilename
//     })
//     User1.save((err, user)=>{
//         if(!err){
//             console.log('User Saved')
//         }else{
//             console.log('Error : '+ err)
//         }
//     })
// })



// var storageFiles = multer.diskStorage({
//     destination: function(req, file, cb) {
//       cb(null, "./uploads");
//     },
//     filename: function(req, file, cb) {
//       let ext = file.originalname.substring(
//         file.originalname.lastIndexOf("."),
//         file.originalname.length
//       );
//       cb(null, file.originalname + "-" + Date.now() + ext);
//     }
//   });
//   var uploadFiles = multer({ storage: storageFiles });
  
route.post("/multiple", uploadFiles.array("galary", 10), function(req, res, err) {
    if (err) {
      console.log(err);
    }
    var files = req.files
    var lst = []
    files.map((i)=>{
        lst.push(i.filename)
    })
    console.log(lst)
    var User1 = new User ({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        salary : req.body.salary,
        file : lst
    })
    User1.save((err, user)=>{
        if(!err){
            console.log('User Saved')
        }else{
            console.log('Error : '+ err)
        }
    })
    return res.send("200")
  });


module.exports= route