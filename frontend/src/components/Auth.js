import React, {useState} from 'react'
import { TextField, Typography, Box, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { authActions } from './../store/index';

const Auth = () => {
  //after login and logout ie initialstate, we want to update the state in the redux
  const dispatch = useDispatch()

    const navigate = useNavigate()


const  [inputs, setInputs] = useState({
      name:"",
      email:"",
      password:"",
})




  const  [isSignup, setIsSignup] = useState(false)


//we are changing the values according to the identifiers
const handleChange = (e)=>{
 //name is the identifier of each of the text fields
setInputs((prevState)=>({
    ...prevState,
    [e.target.name]:e.target.value

}))

// the target is the textfield
//  console.log(e.target.name, "value", e.target.value)

}



     const sendRequest = async (type="login")=>{
      const res = await axios.post(`http://localhost:3005/api/user/${type}`, {
          name:inputs.name,
          email:inputs.email,
          password:inputs.password

     }).catch((err) => console.log(err))
     const data = await res.data
     return data
 }


   const handleSubmit = (e)=>{
      e.preventDefault()
      console.log(inputs)

      //send http request
      if(isSignup){
        sendRequest("signup").then((data)=>localStorage.setItem("userId", data.user._id))
        .then(()=>dispatch(authActions.login()))
        .then(()=>navigate("/blogs"))
        .then(data=>console.log(data)) //we can remove this
      }else{
        sendRequest().then((data)=>localStorage.setItem("userId", data.user._id))
        .then(()=>dispatch(authActions.login()))
        .then(()=>navigate("/blogs"))
        .then(data=>console.log(data))
      }


   }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <Box
            maxWidth={400}
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
            boxShadow = "10px 10px 20px #ccc"
            padding={3}
            margin="auto"
            marginTop={5}
            display="flex"
            borderRadius={5}
            >
        <Typography  padding={3} textAlign="center" variant="h4">
           {isSignup ? "Signup" : "Login"}</Typography>


             {isSignup && <TextField name="name"
             onChange={handleChange}
              type={"name"}
              value={inputs.name}
               variant="outlined"
                placeholder="Name"
                margin="normal"
                /> }
               <TextField  name="email"
               onChange={handleChange}
               type={"email"}
               value={inputs.email}
                variant="outlined"
                 placeholder="Email"
                  margin="normal"
                  />
               <TextField  name="password"
               onChange={handleChange}
               type={"password"}
                value={inputs.password}
                variant="outlined"
                 placeholder="Password"
                  margin="normal"
                  />
               <Button  sx={{borderRadius:3, marginTop:2}}  variant="contained" color="warning" type="submit">Submit</Button>
               <Button onClick={()=>setIsSignup(!isSignup)} sx={{borderRadius:3, marginTop:2}}>
                 Change To {isSignup ? "Login" : "Signup"}
                 </Button>
          </Box>
      </form>
    </div>
  )
}

export default Auth