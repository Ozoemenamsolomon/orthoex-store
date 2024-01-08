import { useEffect, useState } from 'react';
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
import { useUser } from '@auth0/nextjs-auth0/client';
import { fetchRow } from '@utils/rehabspcetable';

const AccountHistory = ({log, customer}) => {
	const {user}=useUser()
	const [activities, setActivities] = useState(log?.data || [])

	return (
		<div className=" overflow-hidden ">
			

			<div className="py-">
				{/* <div className="flex flex-col gap-6 justify-center text-center">
					<div className="flex justify-center">
						<div className="shrink-0 rounded-full h-14 w-14 flex justify-center items-center bg-[var(--oex-grey)] text-[var(--oex-off-white)]">
							AI
						</div>
					</div>

					<div className="">
						<h5>Adbur-rasheed Idris {toggle} </h5>
						<div className="text-sm">
							Idrisrash2017@gmail.com
							<br />
							+2348109945686
							<br />
							<div className="text-[var(--oex-grey)]">Added April 1 2023</div>
						</div>
					</div>
				</div> */}

				{/* <div className="flex justify-center pt-8 gap-4 text-sm items-start">
					<div className="text-center flex flex-col justify-center">
						<div className="flex justify-center">
							{' '}
							<PhoneIcon />
						</div>
						<div className="">Call</div>
					</div>
					<div className="text-center flex flex-col justify-center">
						<div className="flex justify-center">
							{' '}
							<WhatsAppIcon />
						</div>
						<div className="">Whatsapp</div>
					</div>
					<div className="text-center flex flex-col justify-center">
						<div className="flex justify-center">
							{' '}
							<EmailIcon />
						</div>
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
				</div> */}
			</div>

			<div className="flex  ">
				<div className="p-6 border broder-[var(--oex-light-grey)] flex gap-4 items-center">
					<SessionsIcon />
					<div className="">
						<div className="">{customer?.sessionBalance} Sessions</div>
						<small className="text-green-500">Balance</small>
					</div>
				</div>
			</div>

			<h4 className="font-medium pt-6">Recent History</h4>

			{activities?.map(
				(item, i) => (
					<div className="flex justify-between gap-4 border-b  py-4" key={i}>
						<div className="flex gap-4">

							{item?.activityType?.action === 'Session cancelled' && <SessionCancelled />}

							{item?.activityType?.action === 'booked' && <SessionBooked  />}

							{item?.activityType?.action === 'Session purchased' && <SessionPurchsed />}

							{item?.activityType?.action === 'Session used' && <SessionUsed />}

							<div className="">
								<div className="">{item?.activityType?.action}</div>
								<div className="">{new Date(item?.createdAt).toLocaleDateString()}</div>
							</div>
						</div>

						<div className="">
							<div className="font-semibold">N{item?.activityType?.amount}</div>
							<div className="text-sm">{item?.activityType?.sessions} Sessiosns</div>
						</div>
					</div>
				),
			)}
		</div>
	);
};


export default AccountHistory