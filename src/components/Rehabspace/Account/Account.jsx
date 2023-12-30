import React, { useState } from 'react';
import { ClockIcon, MapIcon } from '../../../data/rehabspace';
import Calender from '../Calender';

const Account = () => {
	const [booking, setBooking] = useState('');
	const [active, setActive] = useState(1)
	return (
		<div className="section-padding">
			<div className="py-14">
				<div className="flex justify-between items-center flex-wrap gap-14">
					<div className="">
						<div className="flex gap-4">
							<ClockIcon />
							<div className="">80 min appointments</div>
						</div>
						<div className="flex gap-4">
							<MapIcon />
							<div className="sm:w-80">
								2A, Musari Apena Street, Ewu-Titan, Off Labinjo Kalejaiye
								Street, Mafoluku, Oshodi, Lagos State.
							</div>
						</div>
					</div>
					<div className="text-lg space-y-2">
						<p>Selected Schedule:</p>
						<p className="text-orange-600">{booking}</p>
					</div>
				</div>
			</div>

			<div className="grid lg:flex lg:justify-between gap-14 flex-wrap">
				<div className="">
					<h5 className="pb-8">Select location</h5>
					<div className="flex flex-wrap gap-6">
						{
							[1,2,3]?.map((item,i)=>
							<div key={i} className="">
								<button onClick={()=>{
									setActive(i)
								}}  className={`${active===i?'border-[var(--oex-orange)]':''} border text-center border-[var(--oex-grey)] px-4 py-2 rounded-md `}>
								Mafoluku
								</button>
							</div>
							)
						}
					</div>
				</div>
				<div className="">
					<Calender setBooking={setBooking} />
				</div>
			</div>
		</div>
	);
};

export default Account;
