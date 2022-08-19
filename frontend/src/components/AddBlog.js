import React, {useState} from 'react'
import {Box, Typography, InputLabel, TextField, Button} from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useStyles } from "./Utils";


const labelStyle={
    mb:1, mt:2,fontSize:"24px", fontWeight:"bold"

}



const AddBlog = () => {
    const classes = useStyles()


    const navigate = useNavigate()



    const  [inputs, setInputs] = useState({
        title:"",
        description:"",
        imageURL:"",
  })
  const handleChange = (e)=>{
    //name is the identifier of each of the text fields
   setInputs((prevState)=>({
       ...prevState,
       [e.target.name]:e.target.value

   }))

}

const sendRequest= async ()=>{
   const res = await axios.post('http://localhost:3005/api/blog/add', {
       title:inputs.title,
       description:inputs.description,
       image:inputs.image,
       user:localStorage.getItem("userId")

  }).catch((err) => console.log(err))
  const data = await res.data
  return data
}


const handleSubmit = (e)=>{
   e.preventDefault();
   console.log(inputs)

   sendRequest().then((data)=>console.log(data))
   .then(()=>navigate("/myBlogs"))

}






  return (
    <div>
     <form onSubmit={handleSubmit}>
         <Box
          border={3}
           borderColor="grey"
            borderRadius={10}
             boxShadow="10px 10px 20px #ccc"
             padding={3}
             margin={3}
             display="flex"
             flexDirection={"column"}
             width={"80%"}
             >
             <Typography
             className = {classes.font}
              fontWeigth={'bold'}
               padding={3}
               margin={"auto"}
               marginTop={3}
               color="grey"
               variant="h2"
               textAlign={"center"}
               >
                 Post Your Blog</Typography>
             <InputLabel
             className = {classes.font}
             sx={labelStyle}>
                 Title
            </InputLabel>

             <TextField
             className = {classes.font}
             name="title" onChange={handleChange} value={inputs.title} margin="auto" variant="outlined" />
             <InputLabel
             className = {classes.font}
              sx={labelStyle}>
                 Description
            </InputLabel>
             <TextField
             className = {classes.font}
             name="description" onChange={handleChange} value={inputs.description} margin="auto" variant="outlined"/>
             <InputLabel
               sx={labelStyle}>
                 ImageURL
            </InputLabel>
             <TextField
             className = {classes.font}
               name="image" onChange={handleChange} value={inputs.image} margin="auto" variant="outlined"/>
             <Button  sx={{mt:2, borderRadius:4}} variant="contained" color="warning" type="submit">Submit</Button>
         </Box>
     </form>

    </div>
  )
}

export default AddBlog
