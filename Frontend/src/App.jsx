import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Captainlogin from './pages/Captainlogin.jsx'
import Captainsignup from './pages/Captainsignup.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/> }/>
        <Route path='/captain-login' element={<Captainlogin/> }/>
        <Route path='/captain-signup' element={<Captainsignup/> }/>
        <Route path='/login' element={<UserLogin/> }/>
        <Route path='/signup' element={<UserSignup/> }/>
      </Routes>
    </div>
  )
}

export default App
