const express = require("express")
const app = express()
const Fs = require('./routes/Fs.js')
const CurrentPath = require('./routes/currentPath')
const EJS = require('./routes/EJS')
const nodeMailer = require('./routes/nodeMailer')
const CrudPostman = require('./routes/crudPostman')
const Mongo = require('./routes/mongo')
const Mongoose = require('./routes/mongoose')


const path = require('path')
const  cors = require("cors");
app.use(cors());
app.use('/static', express.static(path.resolve('uploads')))
app.use('/fs', Fs)
app.use('/path',CurrentPath)
app.use('/email',nodeMailer)
app.use('/ejs',EJS)
app.use('/crud',CrudPostman)
app.use('/mongo',Mongo)
app.use('/mongoose',Mongoose)






app.listen(5000, ()=>console.log("surver is runing"))