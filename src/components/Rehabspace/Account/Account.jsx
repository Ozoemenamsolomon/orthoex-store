import React, { useState } from 'react';
import { ClockIcon, MapIcon } from '../../../data/rehabspace';
import Calender from '../Calender';

const Account = () => {
	const [booking, setBooking] = useState('');
	return (
		<div className="section-padding">
			<div className="py-14">
				<div className="flex justify-between items-center">
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

			<div className="grid lg:flex lg:justify-between gap-14">
				<div className="lg:w-1/4">
					<h5 className="pb-8">Select location</h5>
					<div className="grid sm:flex lg:grid gap-6">
						<button className="border border-[var(--oex-grey)] px-10 py-3 rounded-md">
							Mafoluku
						</button>
						<button className="border border-[var(--oex-grey)] px-10 py-3 rounded-md">
							Mafoluku
						</button>
						<button className="border border-[var(--oex-orange)] px-10 py-3 rounded-md">
							Mafoluku
						</button>
					</div>
				</div>
				<div className="lg:w-3/4 ">
					<Calender setBooking={setBooking} />
				</div>
			</div>
		</div>
	);
};

export default Account;
