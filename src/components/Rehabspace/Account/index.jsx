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
	const [customerState, setCustomerState] = useState(customer);

	console.log({rehabspaceData, user, customerState})
	
	return (
		<>
		<div className="">
			<div className="py-10 grid sm:grid-cols-2 gap-10">
				<AccountHistory log={rehabspaceData?.activityHistory?.data} customer={customerState}/>
				<div className="space-y-12">
					<PaymentGrid />
					<BookingGrid />
				</div>
			</div>
		</div>
		
		{/* booking modal */}
		{router.query?.action==='booking' ? <BookingModal customer={customerState} setCustomer={setCustomerState} location={rehabspaceData?.location} holidays={rehabspaceData?.holidays} booking={booking} setBooking={setBooking} /> : null}
		</>

	);
};

export default index;
