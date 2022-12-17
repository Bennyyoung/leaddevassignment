import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom"
import {Login, Home, EditOrder} from './pages';
import useToken from './customHook/useToken';
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
        <Route path="/edit-order/:id" element={<EditOrder />} />
      </Routes>
      
    </div>
  );
}

export default App;
