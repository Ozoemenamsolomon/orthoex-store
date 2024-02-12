import React from 'react';
import {
	EmailIcon,
	PhoneIcon,
	ScheduleIcon,
	SessionsIcon,
	WhatsAppIcon,
} from '../../../data/rehabspace';
import { toast } from 'react-toastify';
import AccountHistory from '../Account/AccountHistory';
import { useRouter } from 'next/navigation';
import { stringToJson } from '@utils/stringToJson';
import Link from 'next/link';
import { Activity, CustomerType } from '@data/rehabspace/types'; 
import PageLoading from '@components/Loader/PageLoading'

type ColumnBProps = {
	setToggle: React.Dispatch<React.SetStateAction<any>>;
	loading: number;
	type: any;
	customer: CustomerType | any; 
	customerLog: Activity[]; 
};

const ColumnB: React.FC<ColumnBProps> = ({ setToggle, loading, type, customer, customerLog }) => {
	const { push } = useRouter();
	const {
		customerEmail,
		firstName,
		lastName,
		registrationDate,
		sessionBalance,
		whatsappNumber,
		phoneNumber,
	} = stringToJson(customer) || {};
	

	return (
		<div className="px-4 overflow-hidden ">
			{type && (
				<button type="button" onClick={() => setToggle('')}>
					{`< Back`}
				</button>
			)}

			<div className="pb-6">
				<div className="flex flex-col gap-4 justify-center items-center text-center">
						<div className={`${ firstName ? '' : 'animate-pulse' } shrink-0 rounded-full h-14 w-14 flex justify-center items-center bg-[var(--oex-grey)] text-[var(--oex-off-white)] `}>
							{firstName?.[0]}
							{lastName?.[0] || firstName?.[1] }
						</div>

					<div className="w-full">
						<h5>{firstName ? `${firstName} ${lastName} ` : (<div className='animate-pulse mx-auto h-3 w-48 bg-gray-100'></div>) }
						</h5>
						<div className="text-sm">
							{customerEmail || (<div className='animate-pulse h-3 w-40 mx-auto bg-gray-100'></div>)}
							<br />
							 {phoneNumber || (<div className='animate-pulse h-3 w-28 mx-auto bg-gray-100'></div>)}

							<br />
							<div className="text-[var(--text-colour-grey)]">
								{ registrationDate ? 
									`Added ${new Date(registrationDate).toDateString() }`
								 : 
									null
								}
							</div>
						</div>
					</div>
				</div>

				<div className="flex justify-center pt-4 gap-4 text-sm items-start">
					<div className="text-center flex flex-col justify-center">
						<Link onClick={()=>!phoneNumber && toast.warning('Phonenumber is missing')} href={phoneNumber ? `tel:+${phoneNumber}` : '#'} className="flex justify-center">
							<PhoneIcon />
						</Link>
						<div className="">Call</div>
					</div>
					<div className="text-center flex flex-col justify-center">
						<Link onClick={()=>!whatsappNumber && toast.warning('Whatsapp number is missing')}  href={whatsappNumber ? `tel:+${whatsappNumber}` : '#'} 
						className="flex justify-center">
							<WhatsAppIcon />
						</Link>
						<div className="">Whatsapp</div>
					</div>
					<div className="text-center flex flex-col justify-center">
						<Link onClick={()=>!whatsappNumber && toast.warning('email is missing')} href={customerEmail ? `mailto:${customerEmail}` : '#'}
						className="flex justify-center">
							<EmailIcon />
						</Link>
						<div className="">Email</div>
					</div>
					<div className="text-center flex flex-col justify-center">
						<div onClick={()=>push('?action=booking')} 
						className="flex justify-center">
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
					loading ? 
					<div className='h-80 w-full flex justify-center items-center'>
						<PageLoading />
					</div> :
					customerLog?.length ? <AccountHistory admin={true} log={customerLog} customer={customer}/> :
					<p className='h-80 w-full flex justify-center items-center'>No user log</p>
				}
			</div>

			
		</div>
	);
};

export default ColumnB;
