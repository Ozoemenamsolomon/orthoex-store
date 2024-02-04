import React, { useEffect, useState } from 'react';
import ColumnA from './ColumnA';
import ColumnB from './ColumnB';
import ColumnC from './ColumnC';
import { fetchActivities, fetchCustomer } from '@utils/rehabspcetable';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import BookingModal from '../Account/BookingModal';
import { stringToJson } from '@utils/stringToJson';

const RehabspaceAdmin = ({rehabspaceData}) => {
	let appointments = rehabspaceData?.appointments?.data
	const [customer, setCustomer] = useState(null);
	const [customerLog, setCustomerLog] = useState([])
	const [toggle, setToggle] = useState(appointments?.[0]?.id);
	const {query}=useRouter()
	const [booking, setBooking] = useState(new Date().toLocaleString());
	const [show, setShow] = useState(0);

	const [loadingLog, setLoadingLog] = useState(0)

	const [appointmentTable, setAppointmentTable] = useState(appointments)

	const updateCustomer = async (customer) => {
		try {
			const {data,error} = await fetchCustomer(stringToJson(customer)?.email || stringToJson(customer)?.customerEmail)
			setCustomer(data?.[0])
			console.log( {data,error})
			if(data?.[0]) {
				setLoadingLog(true)
				const log = await fetchActivities( data?.[0]?.email || data?.[0]?.customerEmail)
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
			setLoadingLog(false)
		}
	}

	useEffect(() => {
		updateCustomer(stringToJson(appointments?.[0]?.user))
	}, [])
	
	// TODO: refetch 
	// console.log({rehabspaceData, customer, })
	return (
		<main className="mx-auto  max-w-[1500px] max-md:px-[1rem] px-[4rem] py-12 ">
			{query?.action==='booking' ? 

			<BookingModal customer={customer} setCustomer={setCustomer} location={rehabspaceData?.location} holidays={rehabspaceData?.holidays} booking={booking} setBooking={setBooking} setShow={setShow}/> : ''}

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="md:grid hidden">
					<ColumnA rehabspaceData={rehabspaceData} setToggle={setToggle} toggle={toggle} setCustomer={setCustomer}  customer={customer} setCustomerLog={setCustomerLog} 
					
					appointmentTable={appointmentTable} setAppointmentTable={setAppointmentTable}
					updateCustomer={updateCustomer}
					/>
				</div>
				<div className="md:hidden">
					{!toggle ? (
						<ColumnA toggle={toggle} rehabspaceData={rehabspaceData} setToggle={setToggle} setCustomer={setCustomer}  customer={customer} setCustomerLog={setCustomerLog}
						
						appointmentTable={appointmentTable} setAppointmentTable={setAppointmentTable}
						updateCustomer={updateCustomer}
						
						/>
					) : (
						<div className="md:hidden">
							<ColumnB loading={loadingLog} customer={customer} setToggle={setToggle}  setCustomer={setCustomer}   customerLog={customerLog} setCustomerLog={setCustomerLog}/> 
						</div>
					)}
				</div>

				<div className="md:grid hidden">
					<ColumnB  loading={loadingLog} customer={customer} setCustomer={setCustomer} customerLog={customerLog} setCustomerLog={setCustomerLog}/>
				</div>

				<ColumnC rehabspaceData={rehabspaceData} appointmentTable={appointmentTable}/>
			</div>
		</main>
	);
};

export default RehabspaceAdmin;
