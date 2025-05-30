// import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { Signup } from "./signup";
import { Signin } from "./signin";
import { DashBoard } from "./dashboard";
import { Transfer } from "./transfer";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/send" element={<Transfer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
