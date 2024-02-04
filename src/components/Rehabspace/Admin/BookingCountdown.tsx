import React, { useState, useEffect } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import { TbChecks } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { fetchActivities, updateAppointmentStatus } from '@utils/rehabspcetable';
import { stringToJson } from '@utils/stringToJson';
import { Appointment, Activity } from '@data/rehabspace/types';

interface BookingComponentProps {
  bookingDate: string;
  appointment: Appointment;
  setCustomerLog: React.Dispatch<React.SetStateAction<Activity[]>>;
  appointmentTable: Appointment[];
  setAppointmentTable: React.Dispatch<React.SetStateAction<Appointment[]>>;
  index: number;
}

const BookingCountdown: React.FC<BookingComponentProps> = ({
  bookingDate,
  appointment,
  setCustomerLog,
  appointmentTable,
  setAppointmentTable,
  index,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<string>(appointmentTable[index]?.status?.status || '');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const appointmentTime = new Date(bookingDate);
      const currentTime = new Date();
      const startTime = new Date(appointmentTime.getTime() - 24 * 60 * 60 * 1000);
      const remaining = startTime.getTime() - currentTime.getTime();
  
      if (remaining <= 0 || status !== 'check-in') {
        clearInterval(intervalId);
        setTimeRemaining(0)
        if (status === 'check-in') {
          setStatus('checked-in');
          handleBooking('checked-in');
        }
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [bookingDate, status,]);

  function convertMillisecondsToDHMS(milliseconds:number) {
    let seconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(seconds / 86400); 
    seconds %= 86400;
    const hours = Math.floor(seconds / 3600); 
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60); 
    seconds %= 60;

    const formattedSeconds = Math.floor(seconds); 
    const formattedTime = `${days ? days+'days,' : ''}${hours ? hours+'hrs,' : ''}${minutes ? minutes+'mins,' : ''}${formattedSeconds ? formattedSeconds+'secs' : 0}`;
  
    return formattedTime;
  }
  
  const handleBooking = async (action: string): Promise<string | void> => {
    try {
      const { data } = await updateAppointmentStatus(action, appointment);
      if (data) {
        const newList = [...appointmentTable];
        newList.splice(index, 1, data[0]);
        setAppointmentTable(newList);
        toast.success(`Session ${action}`);
        setStatus(action);
        setTimeRemaining(0);
        return stringToJson(data[0]?.user)?.customerEmail;
      } else {
        toast.error('Action failed');
      }
    } catch (error: any) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  const handleClicked = async (action: string) => {
    try {
      const customerEmail = await handleBooking(action);
      if (customerEmail) {
        const result = await fetchActivities(customerEmail);
        console.log(result);
        if (result?.data) {
          setTimeout(() => {
            setCustomerLog(result.data);
          }, 500);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='flex gap-2'>
      {
        status === 'check-in' && Number(timeRemaining) > 0 ? 
          <button onClick={() => handleClicked('cancelled')} className="flex flex-col items-center p-1  duration-300 gap-1">
            <FaRegTimesCircle size={16} color='red'/>
            <div className='text-[12px] text-[var(--oex-dark-grey)]'>Cancel</div>
          </button> : 
          null
      }

      <div className='flex flex-col justify-between h-full items-center'>
        <button onClick={() => handleBooking('checked-in')}
          disabled={status !== 'check-in' || Number(timeRemaining) <= 0}
          className={`p-1 shrink-0 flex flex-col items-center ${status !== 'check-in' || Number(timeRemaining) <= 0 ? 'cursor-not-allowed ' : ' duration-300'}`}>
            <div className={status !== 'check-in' || Number(timeRemaining) <= 0 ? 'text-[var(--oex-dark-grey)]' : 'text-orange-500'}>
              <TbChecks size={20}/>
            </div>
            <div className="text-[12px] text-[var(--oex-dark-grey)]">
              {status}
            </div>
        </button>

        <p className='text-[10px] text-orange-500'>
          {status !== 'check-in' || Number(timeRemaining) <= 0 ? '00:00:00' : (timeRemaining !== undefined ? convertMillisecondsToDHMS(timeRemaining) : '')}
        </p>

      </div>
    </div>
  );
};

export default BookingCountdown;
