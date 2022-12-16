import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import useToken from './customHook/useToken';
import Home from './pages/Home';
import "./App.css"


function App() {
  const { token, setToken } = useToken()

  
  if(!token) {
    return <Login setToken={setToken} />
  }

  
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home token={token} />} />
      </Routes>
      
    </div>
  );
}

export default App;
