import React, { useState } from 'react';
import { ClockIcon, MapIcon } from '../../../data/rehabspace';
import Calender from '../Calender';

const Account = () => {
	const [booking, setBooking] = useState('');
	
	return (
		<div className="fixed inset-0 z-50 bg-white overflow-auto">
			<header className='fixed flex items-center border-b h-20 w-full bg-white  '> 
				<div className='section-padding-x flex  w-full  justify-between  items-center gap-20'>
					<div className="">Logo here</div>
					<div className="">
						x
					</div>
				</div>

			</header>

			

			<section className="pt-28  section-padding-x">
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
			</section>

			<section className="section-padding-x py-20 ">
				
			
					<Calender setBooking={setBooking} />
				
			</section>
		</div>
	);
};

export default Account;
