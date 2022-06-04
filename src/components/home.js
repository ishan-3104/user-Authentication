import { Button, Typography } from '@mui/material'
import React from 'react'
import {  useNavigate } from 'react-router-dom'

export default function Home() {
    

    const navigate = useNavigate()
    return (
        <div>
            <Typography variant='h2'
            sx={{marginTop : 30 }}
            > HOME</Typography>
            <Button variant='contained' sx={{margin:1}} onClick={()=>navigate('/signin')}>Signin</Button>
            <Button variant='contained' sx={{margin:1}} onClick={()=>navigate('/login')}>Login</Button>


        </div>

    
  )
}
