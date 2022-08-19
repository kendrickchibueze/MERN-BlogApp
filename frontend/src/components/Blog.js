import React from 'react'
import axios from 'axios'
import {
        Avatar,
        Card,
        CardContent,
        CardHeader,
        CardMedia,
        Typography,
        Box,
        IconButton
    }
 from '@mui/material';
 import { useNavigate } from 'react-router-dom'
 import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
 import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
 import { useStyles } from "./Utils";



const Blog = ({title, description, imageURL, userName, isUser, id}) => {


      const classes = useStyles()

    const navigate = useNavigate()

     const handleEdit=() => {
          navigate(`/myBlogs/${id}`)
     }

     const deleteRequest = async() =>{
         const res = await axios.delete(`http://localhost:3005/api/blog/${id}`)
         .catch(err =>console.log(err))
         const data = await res.data
         return data

     }

     const handleDelete =()=>{
         deleteRequest().then((data)=>console.log(data))
        //  .then(()=>navigate("/")) //refresh the page
         .then(()=>navigate("/Blogs"))

     }


    console.log(title, isUser)

return (
    <div>
        <Card sx={{
             width: "40%",
              margin:'auto',
               mt:2,
               padding:2,
               boxShadow:"5px 5px 10px #ccc",":hover":{
                   boxShadow:"10px 10px 20px #ccc"

               }}}>


        {isUser && (
            <Box display="flex">
                <IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}><EditLocationAltIcon color="warning"/></IconButton>
                <IconButton onClick={handleDelete} ><DeleteSweepIcon color="error"/></IconButton>

            </Box>
        )}
      <CardHeader

        avatar={
          <Avatar  className = {classes.font} sx={{ bgcolor: "orange" }} aria-label="recipe">
            {userName}
          </Avatar>
        }

        title={title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Paella dish"
      />


      <CardContent>
      <hr/>
      <br/>
        <Typography  className = {classes.font} variant="body2" color="text.secondary">
         <b>{userName}</b>: {description}
        </Typography>
      </CardContent>

    </Card>


    </div>
  )
}

export default Blog
