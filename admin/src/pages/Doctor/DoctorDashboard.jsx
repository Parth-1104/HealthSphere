import React from 'react'
import { useContext, useEffect, useState } from 'react' // Import useState
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import Modal from 'react-modal'; // Import Modal

Modal.setAppElement('#root'); // Set the root element for the modal

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency, backendUrl } = useContext(AppContext)
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageToSend, setMessageToSend] = useState('');
  const [alwaysVisibleAppointment, setAlwaysVisibleAppointment] = useState(null);

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearInterval(intervalId);
  }, [dToken, getDashData])

  const handleVideoCall = () => {
    window.location.href = 'https://virtu-doc.vercel.app';
  };

  const isWithinCallTime = (appointment) => {
    if (!appointment || !appointment.slotDate || !appointment.slotTime) {
      return false;
    }

    try {
      const bookingDateTime = new Date(`${appointment.slotDate}T${appointment.slotTime}`);
      const fifteenMinutesBefore = new Date(bookingDateTime.getTime() - 15 * 60 * 1000);
      const fifteenMinutesAfter = new Date(bookingDateTime.getTime() + 15 * 60 * 1000);

      return currentTime >= fifteenMinutesBefore && currentTime <= fifteenMinutesAfter;
    } catch (error) {
      console.error("Error parsing date or time:", error);
      return false;
    }
  };

  const getVideoCallButtonStyles = (appointment) => {
    if (!appointment || appointment.cancelled || appointment.isCompleted) {
      return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    }
    return isWithinCallTime(appointment) ? 'bg-green-500 hover:bg-green-700 text-white cursor-pointer' : 'bg-gray-400 text-gray-600 cursor-not-allowed';
  };

  const getVideoCallButtonText = (appointment) => {
    if (!appointment || appointment.cancelled || appointment.isCompleted) {
      return 'Video Call';
    }
    return isWithinCallTime(appointment) ? 'Video Call' : 'Call Unavailable';
  };

  const canClickvideoCall = (appointment) => {
    return !appointment?.cancelled && !appointment?.isCompleted && isWithinCallTime(appointment);
  };

  const openMessageModal = (appointmentId, item) => {
    setSelectedAppointmentId(appointmentId);
    setIsMessageModalOpen(true);
    setMessageToSend('');
    setAlwaysVisibleAppointment(item);
  };

  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
    setSelectedAppointmentId(null);
    setMessageToSend('');
    setAlwaysVisibleAppointment(null);
  };

  const handleMessageChange = (event) => {
    setMessageToSend(event.target.value);
  };

  const sendDoctorMessage = async () => {
    if (!selectedAppointmentId) {
      alert('No appointment selected.');
      return;
    }
    if (!messageToSend.trim()) {
      alert('Please enter a message.');
      return;
    }
    try {
      const response = await fetch(
        `${backendUrl}/api/doctor/send-message`,  // Corrected the URL to use backendUrl
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'dtoken': dToken // Use dToken from context
          },
          body: JSON.stringify({ appointmentId: selectedAppointmentId, message: messageToSend })
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        closeMessageModal();
        getDashData();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  return dashData && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{currency} {dashData.earnings}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p></div>
        </div>
      </div>

      <div className='bg-white mt-10 rounded border'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100 border-b' key={index}>
              <img className='rounded-full w-10' src={item.userData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)} at {item.slotTime}</p>
              </div>
              <button
                onClick={canClickvideoCall(item) ? handleVideoCall : undefined}
                className={`font-bold py-2 px-4 rounded text-xs ${getVideoCallButtonStyles(item)} mb-2`}
                disabled={!canClickvideoCall(item)}
              >
                {getVideoCallButtonText(item)}
              </button>
              <button
                onClick={() => {
                  openMessageModal(item._id, item);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
              >
                Send Message
              </button>
              {!item.cancelled && !item.isCompleted && (
                <div className='flex'>
                  <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="Cancel" />
                  <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="Complete" />
                </div>
              )}
              {item.cancelled && <p className='text-red-400 text-xs font-medium'>Cancelled</p>}
              {item.isCompleted && <p className='text-green-500 text-xs font-medium'>Completed</p>}
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isMessageModalOpen}
        onRequestClose={closeMessageModal}
        contentLabel="Send Message Modal"
        className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        <div className="relative bg-white rounded-md shadow-lg p-6 w-96">
          <h2 className="text-lg font-semibold mb-4">
            Send Message to Patient
            {alwaysVisibleAppointment && (
              <span className="text-sm ml-2">
                (To: {alwaysVisibleAppointment.userData.name})
              </span>
            )}
          </h2>
          <textarea
            className="w-full h-32 border rounded-md p-2 mb-3"
            value={messageToSend}
            onChange={handleMessageChange}
            placeholder="Enter your message here..."
            style={{ display: isMessageModalOpen ? 'block' : 'none' }}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={sendDoctorMessage}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Send
            </button>
            <button
              onClick={closeMessageModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
          <button
            onClick={closeMessageModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default DoctorDashboard
