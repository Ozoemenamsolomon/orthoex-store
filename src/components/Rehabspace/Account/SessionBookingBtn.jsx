import { useState } from "react";
import BtnBasic from "../Buttons";
import { toast } from "react-toastify";

const SessionBookingBtn = ({ selectedDay, location, user }) => {
  const [loading, setLoading] = useState(0);

  const appointment = {
    locationId: 123,
    locationName: 'Example Location',
    user: user,
    customerId: 'customer123',
    customerName: user?.given_name,
    customerSurname: user?.family_name,
    customerType: 'Regular',
    appointmentDate: selectedDay,
    AppointmentStartTime: selectedDay,
    status: {
      statusCode: 'confirmed',
      statusDetails: 'Appointment confirmed',
    },
  };

  const handleClick = async () => {
    try {
      setLoading(1);
      const response = await fetch('/api/rehabspace/insert-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ table: 'appointment', data: appointment }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error(errorResponse);
        toast.error('Booking was unsuccessful');
      } else {
        const {data, error} = await response.json();
        if(error){
            console.log('=====', {data, error});
            toast.error('Booking was unsuccessful');
        } else {
            console.log('=====', {data, error});
            toast.success('Booking was successful');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Booking was unsuccessful');
    } finally {
      setLoading(0);
    }
  };

  return (
    <div>
      <BtnBasic onClick={handleClick} text={loading ? 'Booking...' : 'Book session'} className='w-full' />
    </div>
  );
};

export default SessionBookingBtn;
