import React, { useEffect, useState } from 'react';
import {
	EmailIcon,
	PhoneIcon,
	ScheduleIcon,
	SessionBooked,
	SessionCancelled,
	SessionPurchsed,
	SessionUsed,
	SessionsIcon,
	WhatsAppIcon,
} from '../../../data/rehabspace';
import { toast } from 'react-toastify';
import AccountHistory from '../Account/AccountHistory';
import { fetchAll, fetchRow } from '@utils/rehabspcetable';

const ColumnB = ({ type, toggle, setToggle }) => {
	const {id, customerEmail, firstName, lastName, registrationDate, sessionBalance, gender, profession,  customerType, city, whatsappNumber, phoneNumber, email} = toggle || {};

	const [loading, setLoading] = useState(0)
	const [customerLog, setCustomerLog] = useState([])

	useEffect(() => {
		const fetchLog = async () => {
			try {
				setLoading(1)
				const {data,error} = await fetchRow('activityHistory', 'customerEmail', email || customerEmail)
				
				console.log({data,error})
				if(data) {
					data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
					setCustomerLog(data)
				} else {
					toast.error('Error fetching customer log')
				}
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(0)
			}
		}
		fetchLog()
	}, [id])
	
	return (
		<div className="px-4  overflow-hidden ">
			{type && (
				<button type="button" onClick={() => setToggle('')}>{`< Back`}</button>
			)}

			<div className="pb-6">
				<div className="flex flex-col gap-4 justify-center items-center text-center">
						<div className="shrink-0 rounded-full h-14 w-14 flex justify-center items-center bg-[var(--oex-grey)] text-[var(--oex-off-white)]">
							{firstName?.[0]}{lastName?.[0] || firstName?.[1]}
						</div>

					<div className="">
						<h5>{`${firstName} ${lastName} `}</h5>
						<div className="text-sm">
							{customerEmail}
							<br />
							 {phoneNumber}
							<br />
							<div className="text-[var(--text-colour-grey)]">Added {new Date(registrationDate).toDateString()}</div>
						</div>
					</div>
				</div>

				<div className="flex justify-center pt-4 gap-4 text-sm items-start">
					<div className="text-center flex flex-col justify-center">
						<a href={phoneNumber ? `tel:+${phoneNumber}` : ()=>toast.warning('Phonenumber is missing')} className="flex justify-center">
							<PhoneIcon />
						</a>
						<div className="">Call</div>
					</div>
					<div className="text-center flex flex-col justify-center">
						<a href={whatsappNumber ? `tel:+${phoneNumber}` : ()=>toast.warning('Whatsapp number is missing')} 
						className="flex justify-center">
							<WhatsAppIcon />
						</a>
						<div className="">Whatsapp</div>
					</div>
					<div className="text-center flex flex-col justify-center">
						<a href={customerEmail ? `mailto:${customerEmail}` : ()=>toast.warning('email is missing')}
						className="flex justify-center">
							<EmailIcon />
						</a>
						<div className="">Email</div>
					</div>
					<div className="text-center flex flex-col justify-center">
						<div className="flex justify-center">
							{' '}
							<ScheduleIcon />
						</div>
						<div className="">
							Sechedule <br /> appointment
						</div>
					</div>
				</div>
			</div>

			<div className="flex">
				<div className="p-6 border broder-[var(--oex-light-grey)] flex gap-4 items-center">
					<SessionsIcon />
					<div className="">
						<div className="">{sessionBalance | 0} Sessions</div>
						<small className="text-green-500">Balance</small>
					</div>
				</div>
			</div>

			<h4 className="font-medium pt-6">Recent History</h4>

			<div className="max-h-[500px] overflow-auto ">
				{
					loading ? <p className='h-80 w-full flex justify-center items-center'>Loading...</p> :
					customerLog.length ? <AccountHistory admin={true} log={customerLog} customer={toggle}/> :
					<p className='h-80 w-full flex justify-center items-center'>No user log</p>
				}
			</div>

			
		</div>
	);
};

export default ColumnB;
