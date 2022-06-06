const express = require('express')
const route = express.Router()
const fs = require('fs')
const Function = require('../function')

route.get('/',function(req,res){
    res.send(Function.returnPath())

})
route.get('/add/:a/:b',function(req,res){

    res.send(Function.add(Number(req.params.a),Number(req.params.b)).toString())
})
route.get('/sub/:a/:b',function(req,res){

    res.send(Function.sub(Number(req.params.a),Number(req.params.b)).toString())
})
route.get('/mul/:a/:b',function(req,res){

    res.send(Function.mul(Number(req.params.a),Number(req.params.b)).toString())
})
route.get('/div/:a/:b',function(req,res){

    res.send(Function.div(Number(req.params.a),Number(req.params.b)).toString())
})

module.exports= route