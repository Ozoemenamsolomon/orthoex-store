import { useEffect, useState } from "react";
import BtnBasic from "../Buttons";
import { toast } from "react-toastify";
import { fetchAll } from "@utils/rehabspcetable";

const SessionBookingBtn = ({ booking, chosenLocation, customer, setInactiveSlots}) => {
  const [loading, setLoading] = useState(0);
	const [apiError, setApiError] = useState('')

  // handle inactive slots
  // take this to Calender.
  // when date is oicked, use picked date to get all appointmanents for that date, then setInactive dates to the list.
  // from the timeslots ui, check if a particular slot is in the list, then change the border line to green and disable button.
  //  add a accordion to show that the date is not available.
  // when a new slot is picked, add the booking to the setInactive list.
  // when refreshed or page mounts, the procedure repeats with ueEffect.

const bookedDate = new Date(booking)
// console.log('bookedDate=', new Date(bookedDate.setHours(bookedDate.getHours() + 1)), 'actualTime=', booking)
// console.log('bookedDate=', new Date(booking), 'actualTime=', booking)

// status: (check-in, cancelled, checked-in)
  const appointment = {
		locationId: chosenLocation?.locationId,
		locationName: chosenLocation?.locationName,
		user: customer,
		customerId: customer?.id,
		customerName: customer?.firstName,
		customerSurname: customer?.lastName,
		customerType: customer?.customerType,
		appointmentDate: booking,
		AppointmentStartTime: new Date(booking).toLocaleTimeString(),
    appointmentDateTime: new Date(booking),
		status: {
      status: 'check-in', 
      userID: customer?.id, 
      fullname: `${customer?.firstName} ${customer?.lastName}`, 
      update: '', 
      date:  new Date(booking).toLocaleDateString(),
      time: booking
    }
  }

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
            // add to the inactive slots
            setInactiveSlots(prev=>[...prev, booking])
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
