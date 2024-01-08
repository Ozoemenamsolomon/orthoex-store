import React, { useState, useEffect } from 'react';
import { ClockIcon, MapIcon } from '../../../data/rehabspace';
import Calender from '../Calender';
import { FaTimes } from 'react-icons/fa';
import BtnBasic from "../Buttons"
import AccountHistory from "../Account/AccountHistory"
import {PaymentGrid, BookingGrid} from "../PaymentSection"
import BookingModal from "./BookingModal"

const index = ({user, rehabspaceData, customer}) => {
	const [booking, setBooking] = useState(new Date().toLocaleString());
	const [show, setShow] = useState(0);

	// console.log({rehabspaceData, user, customer})
	
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
				<AccountHistory log={rehabspaceData?.activityHistory} customer={customer}/>
				<div className="space-y-12">
					<PaymentGrid customer={customer}/>
					<BookingGrid location={rehabspaceData?.location} setShowBookingPage={()=>setShow('booking')}/>
				</div>
			</div>
		</div>
		
{/* booking modal */}
		{show ? <BookingModal customer={customer} location={rehabspaceData?.location} booking={booking} setBooking={setBooking} setShow={setShow}/> : null}
		</>

	);
};

export default index;
