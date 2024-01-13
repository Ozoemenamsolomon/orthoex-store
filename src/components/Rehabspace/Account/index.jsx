import React, { useState, useEffect } from 'react';
import { ClockIcon, MapIcon } from '../../../data/rehabspace';
import Calender from '../Calender';
import { FaTimes } from 'react-icons/fa';
import BtnBasic from "../Buttons"
import AccountHistory from "../Account/AccountHistory"
import {PaymentGrid, BookingGrid} from "../PaymentSection"
import BookingModal from "./BookingModal"
import { useRouter } from 'next/router';

const index = ({user, rehabspaceData, customer}) => {
	const router = useRouter()
	const [booking, setBooking] = useState(new Date().toLocaleString());
	const [show, setShow] = useState(0);

	console.log({rehabspaceData, user, customer})
	
	return (
		<>
		<div className="">
			<div className="py-10 grid sm:grid-cols-2 gap-10">
				<AccountHistory log={rehabspaceData?.activityHistory} customer={customer}/>
				<div className="space-y-12">
					<PaymentGrid customer={customer}/>
					<BookingGrid customer={customer} location={rehabspaceData?.location} setShowBookingPage={()=>setShow('booking')}/>
				</div>
			</div>
		</div>
		
		{/* booking modal */}
		{router.query?.action==='booking' ? <BookingModal customer={customer} location={rehabspaceData?.location} holidays={rehabspaceData?.holidays} booking={booking} setBooking={setBooking} setShow={setShow}/> : null}
		</>

	);
};

export default index;
