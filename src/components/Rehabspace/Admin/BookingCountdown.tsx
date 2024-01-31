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
  index
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [status, setStatus] = useState<string>(appointmentTable[index]?.status?.status || '');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const appointmentTime = new Date(bookingDate);
      const startTime = new Date(appointmentTime.getTime() - 48 * 60 * 60 * 1000); 
      const currentTime = new Date();
      const remaining = startTime.getTime() - currentTime.getTime();

      if (remaining <= 0 || status !== 'check-in') {
        clearInterval(intervalId);
        if (status === 'check-in') {
          setStatus('checked-in');
        }
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [bookingDate, status]);

  const formatTime = (milliseconds:number) => {
    const seconds = Math.floor((milliseconds / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60).toString().padStart(2, '0');
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  const handleBooking = async (action:string) => {
    try {
      const { data,  } = await updateAppointmentStatus(action, appointment);
      if (data) {
        const newList = [...appointmentTable];
        newList.splice(index, 1, data[0]);
        setAppointmentTable(newList);
        toast.success(`Session ${action}`);
        setStatus(action);
        setTimeRemaining(0);

        const result = await fetchActivities(stringToJson(appointment?.user)?.email || stringToJson(appointment?.user)?.customerEmail);
        if (result?.data) {
          setCustomerLog(result?.data);
          toast.success(`Log refetched`);
        }
      } else {
        toast.error('Action failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  return (
    <div className='flex gap-2'>
      {
        status === 'check-in' && timeRemaining > 0 ? 
          <button onClick={() => handleBooking('cancelled')} className="flex flex-col items-center p-1 hover:shadow duration-300 gap-1">
            <FaRegTimesCircle size={16} color='red'/>
            <div className='text-[12px] text-[var(--oex-dark-grey)]'>Cancel</div>
          </button> : 
          null
      }

      <div className='flex flex-col justify-between h-full items-center'>
        <button onClick={() => handleBooking('checked-in')}
          disabled={status !== 'check-in' || timeRemaining <= 0}
          className={`p-1 shrink-0 flex flex-col items-center ${status !== 'check-in' || timeRemaining <= 0 ? 'cursor-not-allowed ' : 'hover:shadow-md duration-300'}`}>
            <div className={status !== 'check-in' || timeRemaining <= 0 ? 'text-[var(--oex-dark-grey)]' : 'text-orange-500'}>
              <TbChecks size={20}/>
            </div>
            <div className="text-[12px] text-[var(--oex-dark-grey)]">
              {status}
            </div>
        </button>

        <p className='text-[10px] text-orange-500'>
          {status !== 'check-in' || timeRemaining <= 0 ? '00:00:00' : formatTime(timeRemaining)}
        </p>
      </div>
    </div>
  );
};

export default BookingCountdown;
