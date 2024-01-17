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

const AccountHistory = ({log, customer, admin}) => {
	const [activities, setActivities] = useState(log || [])

	return (
		<div className={admin ? '' : "overflow-auto h-screen"}>
			
			{
				admin ? '' : 
				<>
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
				</>
			}

			{activities?.map(
				(item, i) => (
					<div className="flex  gap-4 border-b  py-4" key={i}>
						<div className="flex gap-4 w-3/4">

							{item?.activityType?.action === 'Session cancelled' && <SessionCancelled />}

							{item?.activityType?.action === 'Session booked' && <SessionBooked  />}

							{item?.activityType?.action === 'Session purchased' && <SessionPurchsed />}

							{item?.activityType?.action === 'Session used' && <SessionUsed />}

							<div className="">
								<div className="">{item?.activityType?.action}</div>
								<div className="">{new Date(item?.createdAt).toLocaleString()}</div>
							</div>
						</div>

						<div className="w-1/4 text-left">
							<div className="font-semibold">₦{item?.activityType?.amount?.toLocaleString('en-US')}</div>
							<div className="text-sm">{item?.activityType?.sessions} Sessiosns</div>
						</div>
					</div>
				),
			)}
		</div>
	);
};


export default AccountHistory