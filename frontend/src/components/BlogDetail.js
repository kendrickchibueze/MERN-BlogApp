import { useParams } from 'react-router-dom'
import axios from 'axios'
import {Box, Typography, InputLabel, TextField, Button} from '@mui/material'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'


const labelStyle={
    mb:1, mt:2,fontSize:"24px", fontWeight:"bold"

}

const BlogDetail = () => {

    const navigate = useNavigate()


    const  [inputs, setInputs] = useState({})



    const [blog, setBlog] = useState()

    const id =  useParams().id
    console.log(id)

    const handleChange = (e)=>{
        //name is the identifier of each of the text fields
       setInputs((prevState)=>({
           ...prevState,
           [e.target.name]:e.target.value

       }))

    }


    const  fetchDetails = async()=>{
        const res = await axios.get(`http://localhost:3005/api/blog/${id}`)
          .catch(err=>console.log(err))
         const data  = await res.data
         return data

    }

    useEffect(() => {
        fetchDetails().then((data)=>{
            setBlog(data.blog)
            setInputs({
                title:data.blog.title,
                description:data.blog.description
          })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]); //whenever the id changes, the useEffect we re run the function


    const sendRequest= async ()=>{
        const res = await axios.put(`http://localhost:3005/api/blog/update/${id}`, {
            title:inputs.title,
            description:inputs.description


       }).catch((err) => console.log(err))
       const data = await res.data
       return data
     }
     console.log(blog)



    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(inputs)

        sendRequest().then((data)=>console.log(data))
        .then(()=>navigate("/myBlogs"))

     }






  return (
    <div>
        {inputs && (
         <form onSubmit={handleSubmit}>
         <Box
          border={3}
           borderColor="grey"
            borderRadius={10}
             boxShadow="10px 10px 20px #ccc"
             padding={3}s
             margin={3}
             display="flex"
             flexDirection={"column"}
             width={"80%"}
             >
             <Typography
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
             sx={labelStyle}>
                 Title
            </InputLabel>

             <TextField  name="title" onChange={handleChange} value={inputs.title} margin="auto" variant="outlined" />
             <InputLabel
              sx={labelStyle}>
                 Description
            </InputLabel>
             <TextField name="description" onChange={handleChange} value={inputs.description} margin="auto" variant="outlined"/>
             <Button  sx={{mt:2, borderRadius:4}} variant="contained" color="warning" type="submit">Submit</Button>
         </Box>
     </form>
        )}

    </div>

  )
}

export default BlogDetail