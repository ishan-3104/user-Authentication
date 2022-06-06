
const express = require('express')
const route = express.Router()
const bodyParser = require('body-parser')
route.use(bodyParser.json()); 
route.use(bodyParser.urlencoded({ extended: true }));

route.get('/',function(req,res){
    res.render('Form.ejs',{name : "",pass:""})

})
route.post('/handledata',function(req,res){
    console.log(req.body)
   

    res.render('Form.ejs', {name:req.body.name,pass: req.body.pass});
})

module.exports= route