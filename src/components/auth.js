class auth{
    constructor(){
        this.isauth = false
        this.username = "123"
    }
    setuser(username){
        this.username = username
        localStorage.setItem('username',username)
    }
    setauth(isauth){
        this.isauth = isauth
        localStorage.setItem('isauth',isauth)
    }
    returnSetuser(){
        return localStorage.getItem('username')
    }
    returnSetauth(){
        return localStorage.getItem('isauth')
    }
    logout(cb){
        localStorage.clear()
        cb()
      
       
    }
}

export default new auth();