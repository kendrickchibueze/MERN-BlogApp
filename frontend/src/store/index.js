import {configureStore, createSlice} from '@reduxjs/toolkit'


const  authSlice =  createSlice({
   name:'auth',
   initialState:{ isLoggedIn:false},
   reducers:{
       //action creators
       login(state){
           state.isLoggedIn = true;
       },
       logout(state){
           //once the user is logged out, we remove the id from the local storage
           localStorage.removeItem('userId');
           state.isLoggedIn =false

       }
   }
})

export  const authActions = authSlice.actions




 export const  store = configureStore({
    reducer:authSlice.reducer
})