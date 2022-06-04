import { Alert, AlertTitle, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components'
import {  useNavigate } from 'react-router-dom'
import auth from './auth';

const Form = styled.form`
    width : 600px;
    margin : auto;
    `;



export default function Login() {
    const navigate = useNavigate()

    const [username,setusername] = useState('')
    const [pass,setpass] = useState('')
    const [ err,seterr] = useState('')

    const hadleLogin=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/mongoose/login', {
            username : username,
            password : pass,
            
        }).then((response)=>{
            console.log(response.data)
            
            auth.setauth(response.data.auth)
            auth.setuser(response.data.username)
            if(response.data.auth){
                navigate('/welcome')
                
            }
            else{
                seterr(<div>
                    <Alert severity="error"  sx={{width : '400px', margin : 'auto', marginTop : '50px'}}>
                        <AlertTitle>Error</AlertTitle>
                        Please valide Data - <strong>Chek it out!</strong>
                    </Alert>
                </div>)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>
            <Typography variant='h2'>Login Page</Typography><br/><br/>

            <Form method="post" onSubmit={hadleLogin}>
                <TextField label="User Name" fullWidth required onChange={(e)=>{setusername(e.target.value)}}></TextField><br/><br/>
                <TextField label="Password" fullWidth required onChange={(e)=>{setpass(e.target.value)}}></TextField><br/><br/>
                <Button type='submit' variant='contained' >Login</Button>
                <Button variant='contained' sx={{margin:1}} onClick={()=>navigate('/signin')}>Signin</Button>
            </Form>
            {err}
            
        </div>
    )
}
