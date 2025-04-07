import React from 'react'
import {AppContext} from '../context/AppContext'

const MyAppointments = () => {
  cons { doctors } = useContext(AppContext)
  return (
    <div>
      <p>My Appointments</p>
      <div>
        {doctors.slice(0,2).map(item,index)=>(
          <div key={index}>
            <div>
              
            </div>

          </div>
        )}
      </div>
      
    </div>
  )
}

export default Myappointments
