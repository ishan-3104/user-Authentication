
const bcrypt = require("bcryptjs")
var pass = "shiv123"
bcrypt.hash(pass, 12).then((hash)=>{console.log(hash)})
bcrypt.compare('shi123', '$2a$12$BS6OT7XV7LtBXZoELcPXxe2QA7tqqePhnYY7e9688Z64oJLgxGuFS', (err, isMatch)=>{
    if(!err){
        console.log(isMatch)
    }
})