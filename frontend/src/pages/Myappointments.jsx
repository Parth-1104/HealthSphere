import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyAppointments = () => {
    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [payment, setPayment] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1])-1] + " " + dateArray[2];
    };

    useEffect(() => {
        if (token) {
            getUserAppointments();
        }

        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(intervalId);
    }, [token]);


    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
            setAppointments(data.appointments.reverse());
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const initPay = (order) => {
        if (!window.Razorpay || !import.meta.env.VITE_RAZORPAY_KEY_ID) {
            toast.error("Razorpay is not configured properly.");
            return;
        }
    
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount.toString(), // Amount should be string and in paise
            currency: order.currency,
            name: 'Appointment Payment',
            description: 'Consultation Fee',
            order_id: order.id,
            handler: async function (response) {
                try {
                    const verifyRes = await axios.post(
                        `${backendUrl}/api/user/verifyRazorpay`,
                        {
                            ...response,
                            appointmentId: order.appointmentId
                        },
                        {
                            headers: { token }
                        }
                    );
    
                    if (verifyRes.data.success) {
                        toast.success("Payment successful");
                        setPayment('');
                        getUserAppointments();
                    } else {
                        toast.error(verifyRes.data.message || "Payment verification failed");
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Payment verification error");
                }
            },
            theme: {
                color: '#6366F1',
            },
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
    };
    

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/payment-razorpay`, { appointmentId }, { headers: { token } });
    
            if (data.success) {
                // Attach appointmentId for use in handler
                data.order.appointmentId = appointmentId;
                initPay(data.order);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create payment order");
        }
    };
    
    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } });
            if (data.success) {
                const { session_url } = data;
                window.location.replace(session_url);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleVideoCall = () => {
        window.location.href = 'https://virtu-doc.vercel.app';
    };

    const isWithinCallTime = (appointment) => {
        if (!appointment || !appointment.slotDate || !appointment.slotTime) {
            return false;
        }
    
        try {
            // Parse the date in the format day_month_year
            const [day, month, year] = appointment.slotDate.split('_').map(Number);
            
            // Parse time (assuming format like "10:00 AM")
            let timeStr = appointment.slotTime;
            let hours = parseInt(timeStr.split(':')[0]);
            let minutes = parseInt(timeStr.split(':')[1]);
            
            // Handle AM/PM
            if (timeStr.includes('PM') && hours < 12) {
                hours += 12;
            } else if (timeStr.includes('AM') && hours === 12) {
                hours = 0;
            }
            
            // Create date object (months are 0-indexed in JS Date)
            const bookingDateTime = new Date(year, month - 1, day, hours, minutes);
            
            const fifteenMinutesBefore = new Date(bookingDateTime.getTime() - 15 * 60 * 1000);
            const fifteenMinutesAfter = new Date(bookingDateTime.getTime() + 15 * 60 * 1000);
    
            return currentTime >= fifteenMinutesBefore && currentTime <= fifteenMinutesAfter;
        } catch (error) {
            console.error("Error parsing date or time:", error);
            return false;
        }
    };

    const getVideoCallButtonStyles = (appointment) => {
        return isWithinCallTime(appointment)
            ? 'bg-green-500 hover:bg-green-700 text-white cursor-pointer'
            : 'bg-gray-400 text-gray-600 cursor-not-allowed';
    };

    const getVideoCallButtonText = (appointment) => {
        return isWithinCallTime(appointment) ? 'Video Call' : 'Call Unavailable';
    };

    const canClickvideoCall = (appointment) => {
        return isWithinCallTime(appointment);
    };

    return (
        <div className='mt-[92px]'>
            <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>
            <div className=''>
                {appointments.map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_2fr_auto] gap-4 sm:flex sm:gap-6 py-4 border-b items-center'>
                        <div className='flex-shrink-0'>
                            <img className='w-36 bg-[#EAEFFF]' src={item.docData.image} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-[#5E5E5E]'>
                            <p className='text-[#262626] text-base font-semibold'>{item.docData.name}</p>
                            <p>{item.docData.speciality}</p>
                            <p className='text-[#464646] font-medium mt-1'>Address:</p>
                            <p className=''>{item.docData.address.line1}</p>
                            <p className=''>{item.docData.address.line2}</p>
                            <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                            {item.doctorMessage && (
                                <div className="mt-2 p-2 rounded-md bg-blue-100 text-blue-700 text-xs">
                                    <span className="font-semibold">Doctor's Note:</span> {item.doctorMessage}
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col items-end gap-2 text-sm text-center'>
                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                <button onClick={() => setPayment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>
                            )}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                <div className='flex flex-col'>
                                    <button onClick={() => appointmentStripe(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="Stripe" /></button>
                                    <button onClick={() => appointmentRazorpay(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="Razorpay" /></button>
                                </div>
                            )}
                            {!item.cancelled && item.payment && !item.isCompleted && (
                                <button className='sm:min-w-48 py-2 border rounded text-[#696969]  bg-[#EAEFFF]'>Paid</button>
                            )}
                            <button
                                onClick={canClickvideoCall(item) ? handleVideoCall : undefined}
                                className={`font-bold py-2 px-4 rounded text-xs ${getVideoCallButtonStyles(item)}`}

                            >
                                {getVideoCallButtonText(item)}
                            </button>
                            {item.isCompleted && (
                                <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>
                            )}
                            {!item.cancelled && !item.isCompleted && (
                                <button onClick={() => cancelAppointment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>
                            )}
                            {item.cancelled && !item.isCompleted && (
                                <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAppointments;
