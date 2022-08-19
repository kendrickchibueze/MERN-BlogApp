import React, { useEffect } from 'react'
import './App.css';
import Header from './components/Header';
import {Routes, Route} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import BlogDetail from './components/BlogDetail';
import AddBlog from './components/AddBlog';
import { authActions } from "./store";


function App() {
  const dispatch = useDispatch()


  const  isLoggedIn = useSelector(state => state.isLoggedIn)
    console.log(isLoggedIn)

//when we refresh the page after loggin, everything vanishes,
//this helps us fix it with useEffect hooks

    useEffect(() => {
      if (localStorage.getItem("userId")) {
        //if the id is in local storage, we dispatch an action that the user should be kept loggedin
        dispatch(authActions.login());
      }
    }, [dispatch]);

  return (
    <div >
      <React.Fragment>
        <header><Header/></header>
        <main>
          <Routes>
           { !isLoggedIn ? (<Route path="/auth" element={<Auth/>}/>
            ): (
            <>
            <Route path="/blogs" element={<Blogs/>}/>
            <Route path="/myBlogs" element={<UserBlogs/>}/>
            <Route path="/myBlogs/:id" element={<BlogDetail/>}/>
            <Route path="/blog/add" element={<AddBlog/>}/>{" "}
            </>
            )}
          </Routes>
        </main>
      </React.Fragment>


    </div>
  );
}

export default App;
