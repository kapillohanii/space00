import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Layout from "./pages/Layout"; 
import Home from "./pages/Home"; 
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import NoPage from "./pages/NoPage";
import './App.css';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';
import Search from './pages/Search';
import LoadingPage from './pages/LoadingPage';

function App() {
  return (
    <div className="App">
    <BrowserRouter>      
     <Routes>         
     <Route path="/" element={<Layout />}>           
     <Route index element={<Home />} />           
     <Route path="login" element={<Login />} />  
     <Route path="newpost" element={<NewPost/>}  />  
     <Route path="post/*" element={<EditPost />}  />  
     <Route path="loading" element={<LoadingPage />} />
     <Route path="profile/*" element={<ProfilePage />} />
     <Route path="search" element={<Search />} />
     <Route path="*" element={<NoPage />} />         
     </Route>      
     </Routes>     
     </BrowserRouter> 
    </div>
  );
}

export default App;
