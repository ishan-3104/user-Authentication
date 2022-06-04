import axios from 'axios'
import React, { useEffect, useState } from 'react'
import auth from './auth'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;

`;
export default function Galary() {
    const navigate = useNavigate()
    const [galary,setgalary]=useState([])
    useEffect(()=>{
        axios.post('http://localhost:5000/mongoose/update',{name:auth.returnSetuser()}).then((response)=>{
            
            setgalary(response.data.data[0].file) 
        })
        
    },[])
    

  return (
    <Container>
        <h1>Galary</h1>
        
        <ImageList sx={{ width: 600, height: 'auto',margin:'auto' }} cols={3} rowHeight={220}>
        {galary.map((item,index) => (
            <ImageListItem key={index}>
            <img
                src={`http://localhost:5000/static/${item}`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt="not loaded"
               
            />
            </ImageListItem>
        ))}
        </ImageList>
        <Button variant='contained' sx={{margin:1}} onClick={()=>navigate(-1)}>Back</Button>
    </Container>
  )
}
