import { useEffect, useState } from "react";
import BtnBasic from "../Buttons";
import { toast } from "react-toastify";
import { fetchAll, fetchCustomer, fetchRow } from "@utils/rehabspcetable";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

const SessionBookingBtn = ({ booking, chosenLocation, setInactiveSlots}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(0);
	const [apiError, setApiError] = useState('')
  const {user} = useUser()

  const [customer, setCustomer] = useState('')
  const [refresh, setRefresh] = useState(0)

  const bookedDate = new Date(booking)

  useEffect(() => {
    const fetch= async ()=> {
      const {data, error} = await fetchCustomer(user?.email)
      if (data) {
        setCustomer(data?.[0])
        console.log({data, error})
      } else {
        console.log({data,error})
      }
    }
    fetch()
  }, [refresh])
  

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
    console.log(customer?.sessionBalance < 1 , customer?.sessionBalance)
    if (customer?.sessionBalance < 1 ) {
      toast.warning('Your session balance is empty. Purchase a new session.') 
      return
    } else { 
      try {
        setLoading(1);
        const response = await fetch('/api/rehabspace/insert-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            table: 'appointment', 
            data: appointment, 
            customer: customer,
            user: user,
          }),
        });
  
        if (!response.ok) {
          const errorResponse = await response.json();
          console.error(errorResponse);
          toast.error('Booking was unsuccessful');
        } else {
          const {data, error} = await response.json();
          if(error){
              toast.error('Booking was unsuccessful');
          } else {
              toast.success('Booking was successful');
              // add to the inactive slots
              setInactiveSlots(prev=>[...prev, booking])
              setRefresh(prev=>!prev)
          }
        }
      } catch (error) {
        console.error(error);
        toast.error('Booking was unsuccessful');
      } finally {
        setLoading(0);
      }

    }
    
  };

  return (
    <div>
      <BtnBasic onClick={handleClick} text={loading ? 'Booking...' : 'Book session'} className={` w-full ${customer?.sessionBalance < 1 ? 'bg-orange-300' : 'bg-[var(--oex-orange)]'}`} />
    </div>
  );
};

export default SessionBookingBtn;
