import React, { useState, useEffect } from 'react';
import { ClockIcon, MapIcon } from '../../../data/rehabspace';
import Calender from '../Calender';
import { FaTimes } from 'react-icons/fa';
import BtnBasic from "../Buttons"
import { updateItem } from '@utils/rehabspcetable';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const BookingModal = ({location, holidays, customer, booking, setBooking, setShow}) => {
	const { back} = useRouter()

    const [chosenLocation, setChosenLocation] = useState(location?.data && location?.data?.length && location?.data[0])

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
							<MapIcon size={20} />
							<div className="sm:w-80">
								{chosenLocation?.locationAddress}
							</div>
						</div>
					</div>
					<div className="text-lg space-y-2">
						<p>Selected Schedule:</p>
						<p className="text-orange-600">{booking}</p>
					</div>
				</div>
			</section>

			<section className="section-padding-x py-20 ">
					<Calender chosenLocation={chosenLocation} setChosenLocation={setChosenLocation} location={location} setBooking={setBooking} booking={booking} customer={customer} holidays={holidays?.data}/>
			</section>
		</div>
  )
}

export default BookingModal