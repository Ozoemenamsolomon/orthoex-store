import React, { useState,  } from 'react';
import { ClockIcon, MapIcon } from '../../../data/rehabspace';
import Calender from '../Calender';
import { FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { CustomerType, Location } from '@data/rehabspace/types';

interface BookingModalType {
    location: any;
    setCustomer: React.Dispatch<React.SetStateAction<CustomerType | null>>;
    setBooking: React.Dispatch<React.SetStateAction<string | null>>;
    booking: string | null;
    customer: CustomerType | null;
    holidays: any;
}


const BookingModal: React.FC<BookingModalType> = ({location,  holidays, customer, booking, setBooking,setCustomer, }) => {
	const { back} = useRouter()

    const [chosenLocation, setChosenLocation] = useState<Location>(location?.data?.[0])

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
			<header className='fixed flex items-center border-b h-20 w-full bg-white  '> 
				<div className='section-padding-x flex  w-full  justify-between  items-center gap-20'>
					<div className="">{chosenLocation?.organisationLogo || 'Logo null'} </div>
					<div className="" >
						<FaTimes onClick={()=>back()} />
					</div>
				</div>
			</header>

			<section className="pt-28  section-padding-x">
				<div className="flex justify-between items-center flex-wrap gap-14">
					<div className="">
						<div className="flex gap-4 items-center">
							<ClockIcon />
							<div className="pb-1">{chosenLocation?.bookingDuration} minutes appointments</div>
						</div>
						<div className="flex gap-4 items-center">
							<MapIcon/>
							<div className="sm:w-80">
								{chosenLocation?.locationAddress}
							</div>
						</div>
					</div>
					{/* <div className="text-lg space-y-2">
						<p>Selected Schedule:</p>
						<p className="text-orange-600">{booking}</p>
					</div> */}
				</div>
			</section>

			<section className="section-padding-x py-20 ">
					<Calender chosenLocation={chosenLocation} setChosenLocation={setChosenLocation} location={location} setBooking={setBooking} booking={booking} customer={customer} setCustomer={setCustomer} holidays={holidays?.data}/>
			</section>
		</div>
  )
}

export default BookingModal