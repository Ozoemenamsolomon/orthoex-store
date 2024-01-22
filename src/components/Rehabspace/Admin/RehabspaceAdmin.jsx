import React, { useEffect, useState } from 'react';
import ColumnA from './ColumnA';
import ColumnB from './ColumnB';
import ColumnC from './ColumnC';
import { fetchAll, fetchCustomer } from '@utils/rehabspcetable';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import BookingModal from '../Account/BookingModal';

const RehabspaceAdmin = ({rehabspaceData}) => {
	const [customer, setCustomer] = useState(null);
	const [customerLog, setCustomerLog] = useState([])
	const [toggle, setToggle] = useState(null);
	const {query}=useRouter()
	const [booking, setBooking] = useState(new Date().toLocaleString());
	const [show, setShow] = useState(0);

	useEffect(() => {
		const fetch =async () => {
			const {data,error} = await fetchCustomer(toggle?.email || toggle?.customerEmail)
			setCustomer(data?.[0])
		}
		if(toggle){
			fetch()
		}
	}, [toggle])
	
	// TODO: refetch 
	console.log({rehabspaceData, customer, })
	return (
		<main className="mx-auto  max-w-[1500px] max-md:px-[1rem] px-[4rem] py-12 ">

			{query?.action==='booking' ? 
			<BookingModal customer={customer} setCustomer={setCustomer} location={rehabspaceData?.location} holidays={rehabspaceData?.holidays} booking={booking} setBooking={setBooking} setShow={setShow}/> : ''}

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="md:grid hidden">
					<ColumnA setToggle={setToggle} customer={customer} setCustomerLog={setCustomerLog}/>
				</div>
				<div className="md:hidden">
					{!customer?.id ? (
						<ColumnA setToggle={setToggle} customer={customer} setCustomerLog={setCustomerLog}/>
					) : (
						<div className="md:hidden">
							<ColumnB type={'a'} customer={customer} setCustomer={setCustomer} customerLog={customerLog} setCustomerLog={setCustomerLog}/>
						</div>
					)}
				</div>

				<div className="md:grid hidden">
					<ColumnB customer={customer} setCustomer={setCustomer} customerLog={customerLog} setCustomerLog={setCustomerLog}/>
				</div>

				<ColumnC rehabspaceData={rehabspaceData}/>
			</div>
		</main>
	);
};

export default RehabspaceAdmin;
