import { Avatar, Button, Card, CardContent, CardHeader, Grid, IconButton, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { DeleteOutlined } from "@mui/icons-material";
import axios from 'axios';
import { useEffect } from 'react'
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

export default function Display() {
    const [data,setdata]= useState([])
    var colors = ['#FBC02D','#E91E63','#4CAF50'];
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('http://localhost:5000/mongoose/display').then((response)=>{
           
            setdata(response.data.data)

        })
    },[])
    

  return (
    <div>
        <Typography variant='h2'>All Data</Typography><br/><br/>
        <Box sx={{margin:"auto" ,width:'80%'}}>
        <Grid container spacing={2}>
        {
            data.map((i)=>
            {
                return(
                        <Grid item key={i._id} xs={12} sm={6} md={4}>
                            <Paper>
                                <Card>

                                    <CardHeader sx={{textAlign:'initial'}}
                                    avatar={
                                        <Avatar sx={{
                                            backgroundColor: colors[Math.floor(Math.random() * colors.length)]
                                        }}>
                                            {i.username[0].toUpperCase()}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton >
                                            <DeleteOutlined/>
                                        </IconButton>
                                    }
                                    title={i.username}
                                    subheader={i.email}
                                    />
                                    <CardContent>

                                        <img src={"http://localhost:5000/static/"+i.file[0]} alt = "not loaded" height="150" width = "315"/>
                                        <Typography>Salary : {i.salary}</Typography>
                                    </CardContent>
                                        
                                    
                                </Card>
                            </Paper>
                        </Grid>
                )
            }
            )
        }
        </Grid>
        </Box>
        <br/><br/>
        <Button variant='contained' onClick={()=>navigate(-1)}>Back</Button>
    </div>
  )
}
