import React, { useState, useEffect } from 'react';
import { ClockIcon, MapIcon } from '../../../data/rehabspace';
import Calender from '../Calender';
import { FaTimes } from 'react-icons/fa';
import BtnBasic from "../Buttons"
import AccountHistory from "../Account/AccountHistory"
import {PaymentGrid, BookingGrid} from "../PaymentSection"
import BookingModal from "./BookingModal"
import { useRouter } from 'next/router';
import { fetchActivities, fetchCustomer } from '@utils/rehabspcetable';
import { stringToJson } from '@utils/stringToJson';
import { toast } from 'react-toastify';

const index = ({user, rehabspaceData, customer}) => {
	const router = useRouter()
	const [booking, setBooking] = useState(new Date().toLocaleString());
	const [customerState, setCustomerState] = useState(customer);
	const [customerLog, setCustomerLog] = useState(rehabspaceData?.activityHistory?.data || [])
console.log(rehabspaceData, user)

	const updateCustomerLog = async () => {
		try {
			const {data,error} = await fetchCustomer(stringToJson(user)?.email || stringToJson(customer)?.customerEmail)
			setCustomerState(data?.[0])
			console.log({data,error})

			if(data?.[0]) {
				const log = await fetchActivities( data?.[0]?.email || data?.[0]?.customerEmail)
				console.log({log})
					if(log?.data) {
						setCustomerLog(log?.data)
					} else {
						toast.error('Error fetching customer log')
					}
			} else {
				toast.error('Error fetching customer')
			}
		} catch (error) {
			console.log(error)
		} finally {
		}
	}

	useEffect(() => {
		if(router.query.date){
			updateCustomerLog()
		}
	}, [router.query.date])
	
	return (
		<>
		<div className="">
			<div className="py-10 grid sm:grid-cols-2 gap-10">
				<AccountHistory log={customerLog} customer={customerState}/>
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
