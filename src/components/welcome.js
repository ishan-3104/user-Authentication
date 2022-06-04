import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {  useNavigate } from 'react-router-dom'
import auth from './auth';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Form = styled.form`
    width : 600px;
    margin : auto;
    `;



export default function Welcome() {
    const navigate = useNavigate()

    const [username,setusername] = useState('')
    const [email,setemail] = useState('')
    const [pass,setpass] = useState('')
    const [salary,setsalary] = useState(0)
    const [_id,setid] = useState()
    const [galary,setgalary] = useState({})
    const [galary1,setgalary1] = useState({})

    
    
    useEffect(()=>{
        axios.post('http://localhost:5000/mongoose/update',{name:auth.returnSetuser()}).then((response)=>{
            console.log(response.data.data)
            setusername(response.data.data[0].username)
            setemail(response.data.data[0].email)
            setpass(response.data.data[0].password)
            setsalary(response.data.data[0].salary)
            setid(response.data.data[0]._id)
            setgalary1(response.data.data[0].file)
        })
    },[])

    const hadleUpdate=(e)=>{
        e.preventDefault()

        var formData = new FormData();
        // formData.append('avatar', image)
        formData.append('username', username)
        formData.append('email', email)
        formData.append('password', pass)
        formData.append('salary', salary)
        formData.append('id', _id)
        for (var i = 0; i < galary.length; i++) {
            var file = galary[i];
            formData.append('galary', file);
        }

        axios.post('http://localhost:5000/mongoose/updateone',formData)
        .then((response)=>{
            console.log(response.data.message)
            toast.success('Update successful', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }).catch((err)=>
        {
            console.log(err.message);
        })
        
        
    }
    

  return (
    <div>
        <Typography variant='h2'>Update Page</Typography><br/><br/>

        <Form method="post" onSubmit={hadleUpdate}>
            <TextField label="User Name" fullWidth value={username} required onChange={(e)=>{setusername(e.target.value)}}></TextField><br/><br/>
            <TextField label="Email" fullWidth value={email} onChange={(e)=>{setemail(e.target.value)}}></TextField><br/><br/>
            <TextField label="Password" fullWidth value={pass} required onChange={(e)=>{setpass(e.target.value)}}></TextField><br/><br/>
            <TextField label="salary" fullWidth value={salary} required onChange={(e)=>{setsalary(e.target.value)}}></TextField><br/><br/>
            {/* <TextField type='file' name='file' fullWidth required onChange={(e)=>{setimage(e.target.files[0])}}></TextField> */}
            <TextField type='file' name='galary'   fullWidth  onChange={(e)=>{setgalary(e.target.files)}} inputProps={{ multiple: true }}></TextField><br/><br/>
            {console.log(galary)}
            <img src={"http://localhost:5000/static/"+galary1[0]} alt = "not loaded" height="150" width = "315"/><br/>
            <Button type='submit' variant='contained' >Update</Button>
            <Button variant='contained' sx={{margin:1}}
             onClick={()=>{auth.logout(()=>navigate('/'))
                
            }}>Logout</Button>
            <Button variant='contained' onClick={()=>navigate('/display')} >Display data</Button>
            <Button variant='contained'sx={{margin:1}} onClick={()=>navigate('/galary')} >Galary</Button>
        </Form>
        

            <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
    </div>
  )
}
