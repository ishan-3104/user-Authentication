const express = require('express')
const route = express.Router()
const bodyParser = require('body-parser')
const axios = require('axios')
var mongo = require('mongodb');

route.use(bodyParser.json()); 
route.use(bodyParser.urlencoded({ extended: true }));


    
var  MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://ishanPatel:Ishan3104@cluster0.ikxah.mongodb.net/test";


route.get('/add/:userName/:pass',(req,res)=>{
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ishan");
    var myobj = { user_name: req.params.userName, password: req.params.pass };
    dbo.collection("users").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        
        db.close();
    });
    });

    res.redirect('/mongo/show')
})

route.get('/show',(req,res)=>{
    MongoClient.connect(url,function(err,db){
        if (err) throw err;
        var dbo = db.db("ishan");
       
        dbo.collection("users").find().toArray((err,result)=>{
            res.send(result)
        });
        
    })
})

route.get('/delete/:name',(req,res)=>{
    const name = req.params.name
    MongoClient.connect(url,function(err,db){
        if (err) throw err;
        var dbo = db.db("ishan");
       
        dbo.collection("users").deleteOne({user_name :name})
        res.redirect('/mongo/show')
        
    })
})

route.get('/update/:name/:pass',(req,res)=>{
    var name = req.params.name
    var pass = req.params.pass
    MongoClient.connect(url,function(err,db){
        if (err) throw err;
        var dbo = db.db("ishan");
       
        dbo.collection("users").updateOne({user_name:name},{$set :{password :pass }})
        res.redirect('/mongo/show')
        
    })
})




module.exports= route