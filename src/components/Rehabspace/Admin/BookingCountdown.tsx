import { fetchActivities, updateAppointmentStatus } from '@utils/rehabspcetable';
import { stringToJson } from '@utils/stringToJson';
import React, { useState, useEffect } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import { TbChecks } from 'react-icons/tb';
import { toast } from 'react-toastify';

interface BookingComponentProps {
  bookingDate: string;
  appointment: any;
  setCustomerLog: any
}

const BookingCountdown: React.FC<BookingComponentProps> = ({ bookingDate, appointment, setCustomerLog, appointmentTable, setAppointmentTable, index }) => {
  const [isCancellationAllowed, setIsCancellationAllowed] = useState(true);
  const [countdownUi, setCountdownUi] = useState('');

  const handleBooking = async (action:string) => {
    try {
      const {data, error} = await updateAppointmentStatus(action,appointment)
      if(data){
        const newList = [...appointmentTable];
        newList.splice(index, 1, data[0]);
        setAppointmentTable(newList)
        toast.success(`Session ${action}`)
        setIsCancellationAllowed(false)
        setCountdownUi(`00:00:00`)

        const result = await fetchActivities( stringToJson(appointment?.user)?.email || stringToJson(appointment?.user)?.customerEmail, )
        
        if (result?.data) {
          console.log('rrrrr', result?.data)
          setCustomerLog(result?.data)
          toast.success(`Log refetched`)
        }
      } else {
        toast.error('Action failed')
      }
      console.log({data, error} )
    } catch (error) {
      console.log({error})
    }
  };

  useEffect(() => {
    const updateCountdown = () => {
      const currentTime = new Date().getTime();
      const bookingTime = new Date(bookingDate).getTime();
      const timeDifference = bookingTime - currentTime;

      const hours = Math.floor(timeDifference / (60 * 60 * 1000));
      const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

      if (timeDifference <= 0) {
        setIsCancellationAllowed(false);
        setCountdownUi('00:00:00');
        if (appointment?.status?.status !== 'cancelled'){
          handleBooking('checked-in')
          toast.success(`Session - ${appointment?.appointmentDate} ${appointment?.AppointmentTime} cancellation time expired.`)
        }
      } else {
        setCountdownUi(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []); 



  // when isCancellationAllowed is false then:
  // useEffect(() => {
  //   if (appointment?.status?.status !== 'cancelled' && countdownUi===`00:00:00`) {
  //     handleBooking('cancelled')
  //   }
  // }, [countdownUi===`00:00:00`])
  

  return (
    <div className='flex gap- '>
        {isCancellationAllowed && appointment?.status?.status !== 'cancelled' && appointment?.status?.status !== 'checked-in' ? <button onClick={()=>handleBooking('cancelled')} className="flex flex-col items-center p-1 hover:shadow duration-300 gap-1">
          <FaRegTimesCircle size={16} color='red'/>
          <div className='text-[12px] text-[var(--oex-dark-grey)]'>Cancel</div >
        </button> : ''}

        <div className='flex flex-col justify-between h-full items-center'>
            <button onClick={()=>handleBooking('checked-in')} disabled={!isCancellationAllowed || appointment?.status?.status === 'cancelled' || appointment?.status?.status === 'checked-in' } 
            
            className={` p-1 shrink-0 flex flex-col items-center ${!isCancellationAllowed || appointment?.status?.status === 'cancelled' || appointment?.status?.status === 'checked-in' ? 'cursor-not-allowed ' : 'hover:shadow-md duration-300'}  `}>

                <div className={!isCancellationAllowed || appointment?.status?.status !== 'check-in'  ? 'text-[var(--oex-dark-grey)]' : 'text-orange-500'} > <TbChecks size={20}/> </div>
                <div className="text-[12px] text-[var(--oex-dark-grey)]">
                    {
                        appointment?.status?.status
                    }
                </div>

            </button>
          {/* <p className='text-[10px] text-orange-500'>{ countdownUi }</p> */}
          <p className='text-[10px] text-orange-500'>{appointment?.status?.status === 'cancelled' || appointment?.status?.status === 'checked-in' ? '00:00:00': countdownUi }</p>
        </div>
    </div>
    
  );
};

export default BookingCountdown;
