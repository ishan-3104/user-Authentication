import React from 'react'
import { Navigate} from 'react-router-dom'
import auth from './auth'

export default function Proute({children}) {
   
    console.log(auth.returnSetauth() )
    if(auth.returnSetauth()){
        return <div>{children}</div>

    }
    else{
        return <Navigate to = "/"></Navigate>
    }
  
}
