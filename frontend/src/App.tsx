// import React from 'react'
import { BrowserRouter,Routes ,Route } from 'react-router-dom'
import './App.css'
import { Signup } from './signup'
import { Signin } from './signin'
function App() {
  

  return (
   <BrowserRouter>
   <Routes >
    <Route path='/signup' element={<Signup/>} />
    <Route path='/signin' element={<Signin/>}/>
  
   </Routes>
   
   </BrowserRouter>
  )
}

export default App
