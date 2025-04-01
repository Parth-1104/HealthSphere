import React from 'react'
import Video from '../components/Video'
import Features from '../components/Features'
import Heroimage from '../components/Heroimage'
import SpecialityMenu from '../components/SpecialityMenu'
// import speciality from '../components/SpecialityMenu'
const Home = () => {
  return (
    <div className="relative w-full h-screen">

    <Video/>
      <Features/>
      <SpecialityMenu/>

    </div>
  )
}

export default Home
