import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { authActions } from './../store/index';
import { useStyles } from "./Utils";

import{
    AppBar,
    Typography,
     Toolbar,
      Box,
       Button,
       Tabs,
        Tab
    }
from '@mui/material'



const Header = () => {

    const classes = useStyles()
    //we need to dispatch an action to the redux for logout
    const dispatch = useDispatch()


    const  isLoggedIn = useSelector(state => state.isLoggedIn)
    console.log(isLoggedIn)



    const [value, setValue] = useState()




  return (
      //css gradient
    <AppBar position="sticky" sx={{
        background: "linear-gradient(90deg, rgba(0,28,36,1) 0%, rgba(20,0,255,1) 0%, rgba(0,31,86,1) 0%);"
    }}>
        <Toolbar>
            <Typography className = {classes.font} variant="h4">Blog-App</Typography>
            {isLoggedIn && <Box display="flex" marginLeft={'auto'} marginRight='auto'>
                <Tabs textColor="inherit" value={value} onChange={(e, val)=>setValue(val)}>
                    <Tab className = {classes.font} LinkComponent={Link} to="/blogs" label="All Blogs"/>
                    <Tab className = {classes.font} LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
                    <Tab className = {classes.font} LinkComponent={Link} to="/blog/add" label="Add Blog"/>
                </Tabs>
            </Box>}
            <Box display="flex" marginLeft="auto">
               { !isLoggedIn && (<>
               {" "}
               <Button
                 LinkComponent={Link}
                 to="/auth"
                 variant="contained"
                 sx={{margin:1, borderRadius:10}}
                  color="warning">
                      Login
                      </Button>
                <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{margin:1, borderRadius:10}}
                color="warning">
                    SignUp
                    </Button>
                    </>
                    )}
              { isLoggedIn &&  <Button
               onClick={() =>dispatch(authActions.logout())}
                 LinkComponent={Link} to="/auth"
                  variant="contained"
                   sx={{margin:1, borderRadius:10}}
                    color="warning">
                        Logout
                        </Button>}
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header