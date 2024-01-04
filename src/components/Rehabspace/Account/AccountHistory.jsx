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

const AccountHistory = ({ type, toggle, setToggle }) => {
  
	return (
		<div className="p-4 border overflow-hidden ">
			{type && (
				<button type="button" onClick={() => setToggle('')}>{`< Back`}</button>
			)}

			<div className="py-6">
				<div className="flex flex-col gap-6 justify-center text-center">
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
				</div>

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

			<div className="flex">
				<div className="p-6 border broder-[var(--oex-light-grey)] flex gap-4 items-center">
					<SessionsIcon />
					<div className="">
						<div className="">27 Sessions</div>
						<small className="text-green-500">Balance</small>
					</div>
				</div>
			</div>

			<h4 className="font-medium pt-6">Recent History</h4>

			{['cancelled', 'booked', 'purchased', 'used', 'used', 'used']?.map(
				(item, i) => (
					<div className="flex justify-between gap-4 border-b  py-4" key={i}>
						<div className="flex gap-4">
							{item === 'cancelled' && <SessionCancelled />}
							{item === 'booked' && <SessionBooked />}
							{item === 'purchased' && <SessionPurchsed />}
							{item === 'used' && <SessionUsed />}

							<div className="">
								<div className="">Session {item}</div>
								<div className="">Today</div>
							</div>
						</div>

						<div className="">
							<div className="font-semibold">N12000</div>
							<div className="text-sm">2 Sessiosns</div>
						</div>
					</div>
				),
			)}
		</div>
	);
};


export default AccountHistory