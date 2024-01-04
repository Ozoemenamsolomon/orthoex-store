import React, { useState } from 'react';
import { ClockIcon, MapIcon } from '../../../data/rehabspace';
import Calender from '../Calender';
import { FaTimes } from 'react-icons/fa';
import BtnBasic from "../Buttons"
import AccountHistory from "../Account/AccountHistory"
import {PaymentGrid, BookingGrid} from "../PaymentSection"


const index = ({user, rehabspaceData}) => {
	const [booking, setBooking] = useState('');
	const [show, setShow] = useState(0);

	console.log('rehabspaceData', rehabspaceData, 'user', user)
	
	return (

		<>
		<div className="">
			{/* <div className="sm:flex justify-between items-center gap-10 py-4 border-b rounded px-4 grid">
				<h4>{rehabspaceData?.title}</h4>

				<div className="flex items-center gap-4">
					<div className="">Date from:</div>
					<input type="text" className='py-3 border'/>
					<div className="">Date from:</div>
					<input type="text" className='py-3 border'/>
					<BtnBasic onClick={()=>setShow(1)} href={'#'} text={'Filter'} />

				</div>
			</div> */}

			<div className="py-10 grid sm:grid-cols-2 gap-10">
				<AccountHistory/>
				<div className="space-y-12">
					<PaymentGrid/>
					<BookingGrid setShowBookingPage={()=>setShow('booking')}/>
				</div>
			</div>

		</div>
		

		{show ? <div className="fixed inset-0 z-50 bg-white overflow-auto">
			<header className='fixed flex items-center border-b h-20 w-full bg-white  '> 
				<div className='section-padding-x flex  w-full  justify-between  items-center gap-20'>
					<div className="">Logo here</div>
					<div className="" >
						<FaTimes onClick={()=>setShow(0)} />
					</div>
				</div>
			</header>

			<section className="pt-28  section-padding-x">
				<div className="flex justify-between items-center flex-wrap gap-14">
					<div className="">
						<div className="flex gap-4">
							<ClockIcon />
							<div className="">80 min appointments</div>
						</div>
						<div className="flex gap-4">
							<MapIcon />
							<div className="sm:w-80">
								2A, Musari Apena Street, Ewu-Titan, Off Labinjo Kalejaiye
								Street, Mafoluku, Oshodi, Lagos State.
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
					<Calender setBooking={setBooking} booking={booking} user={user}/>
			</section>
		</div> : null}
		</>

	);
};

export default index;
