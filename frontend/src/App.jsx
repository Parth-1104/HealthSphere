import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/login'
import Contact from './pages/Contact'
import Myprofile from './pages/Myprofile'
import Myappointments from './pages/Myappointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'

import Travel from './pages/Travel'
import About from './pages/About'


const App = () => {
  

  return (
    
    <div className="w-full min-h-screen ">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />

        <Route path='/travel' element={<Travel />} />

        <Route path='/my-profile' element={<Myprofile />} />
        <Route path='/my-appointments' element={<Myappointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
      </Routes>


    </div>

  )
}

export default App
