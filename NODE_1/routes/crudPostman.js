const express = require('express')
const route = express.Router()
const bodyParser = require('body-parser')
const axios = require('axios')
route.use(bodyParser.json()); 
route.use(bodyParser.urlencoded({ extended: true }));

route.get('/',function(req,res){
    axios.get(' http://localhost:8000/users').then((respond)=>{
        res.send(respond.data)
    })
    
})
route.get('/addData/:name/:salary',function(req,res){
    var  name = req.params.name
    var salary = Number(req.params.salary)
    axios.post(' http://localhost:8000/users',{name,salary})
    .then(()=>{
        axios.get(' http://localhost:8000/users').then((respond)=>{
        res.send(respond.data)
    })
    })
})

route.delete('/deleteData/:id', (req,res)=>{
    var id = Number(req.params.id)
    console.log(id)
    axios.delete('http://localhost:8000/users/'+id).then(()=>{
            axios.get('http://localhost:8000/users').then((response)=>{
            console.log(response.data)
            res.send(response.data)
        })
    })
})

route.put('/update/:id/:name/:salary',(req,res)=>{
    var name = req.params.name
    var salary = Number(req.params.salary)
    var id = Number(req.params.id)

    axios.put('http://localhost:8000/users/'+id,{
        name: name,
        salary: salary,
        id:id
    }).then(()=>{
        axios.get('http://localhost:8000/users').then((response)=>{
        console.log(response.data)
        res.send(response.data)
    })
})
})

module.exports= route