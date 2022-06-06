const express = require('express')
const route = express.Router()
const fs = require('fs')

route.get('/',function(req,res){
    res.send("in Route")
})

route.get('/:name',function(req,res){
    const filename = req.params.name
    // res.send(req.params.name)
    fs.readFile(req.params.name,'utf8', function (err,data) {
        // res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(data);
        if (err) throw err
        console.log(data);
        res.end()
      })
})

route.get('/add/:name1',function(req,res){
    fs.appendFile(req.params.name1,'new data', (err)=>{
        console.log("save!")
        res.end()
      })

})

module.exports= route