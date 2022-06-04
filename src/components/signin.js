import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components'
import {  useNavigate } from 'react-router-dom'

const Form = styled.form`
    width : 600px;
    margin : auto;
    `;

export default function Signin() {

    const navigate = useNavigate()

    const [username,setusername] = useState('')
    const [email,setemail] = useState('')
    const [pass,setpass] = useState('')
    const [salary,setsalary] = useState(0)
    // const [image,setimage] = useState({})
    const [galary,setgalary] = useState({})

    
    const hadleSubmit=(e)=>{
        e.preventDefault()
        var formData = new FormData();
        // formData.append('avatar', image)
        formData.append('username', username)
        formData.append('email', email)
        formData.append('password', pass)
        formData.append('salary', salary)
        for (var i = 0; i < galary.length; i++) {
            var file = galary[i];
            formData.append('galary', file);
        }
        axios.post('http://localhost:5000/mongoose/multiple',
            formData, {
                headers: { crossdomain: true,
                    'Content-Type': 'undefined'
                }
            }
        ).then(function (response) {
            console.log(response,"dsbhjisbc");
        })
        .catch(function (error) {
        });
    }


  return (
    <div>
        <Typography variant='h2'>Signin Page</Typography><br/><br/>

        <Form id="myForm" name="myForm" method="post" onSubmit={hadleSubmit} encType="multipart/from-data">
            <TextField label="User Name" name ='username' fullWidth required onChange={(e)=>{setusername(e.target.value)}}></TextField><br/><br/>
            <TextField label="Email" name='email' fullWidth onChange={(e)=>{setemail(e.target.value)}}></TextField><br/><br/>
            <TextField label="Password" name='pass' fullWidth required onChange={(e)=>{setpass(e.target.value)}}></TextField><br/><br/>
            <TextField label="salary" name='salary' fullWidth required onChange={(e)=>{setsalary(e.target.value)}}></TextField><br/><br/>
            {/* <TextField type='file' name='file' fullWidth required onChange={(e)=>{setimage(e.target.files[0])}}></TextField><br/><br/> */}
            <TextField type='file' name='galary' fullWidth required onChange={(e)=>{setgalary(e.target.files)}} inputProps={{ multiple: true }}></TextField><br/><br/>

            <Button type='submit' variant='contained' >Signin</Button>
            <Button variant='contained' sx={{margin:1}} onClick={()=>navigate('/login')}>Login</Button>
        </Form>


    </div>
  )
}
