import React from 'react';
import { FaCheck } from 'react-icons/fa';

const BookingConfirmed: React.FC = () => {
	return (
		<div className="bg-[var(--oex-light-grey)] z-30 max-md:bg-white  md:pt-20 fixed inset-0 flex justify-center items-center">
			<div className="w-full md:w-[600px] bg-white rounded-md py-14 px-6 md:px-10  space-y-10">
				<div className="flex items-center justify-between">
					<div className="flex gap-2 items-center">
						<div className="bg-green-500 w-full mx-auto rounded-full h-10 flex justify-center items-center text-xl font-bold text-white">
							<FaCheck size={24} />
						</div>
						<div className="text-2xl font-semibold">Booking confirmed</div>
					</div>
					<div className="bg-gray-400 h-20 w-20"></div>
				</div>

				<div className="">
					<h6 className="text-[var(-text-colour-light-grey)]">Full name</h6>
					<h4 className="">Abdul-rasheed Idris</h4>
				</div>

				<div className="">
					<h6 className="text-[var(-text-colour-light-grey)]">Location</h6>
					<h4 className="">
						2A, Musari Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						Eos maxime sed ad?
					</h4>
				</div>

				<div className="">
					<h6 className="text-[var(-text-colour-light-grey)]">Date</h6>
					<h4 className="">Wednesday, 3 November 2023</h4>
				</div>

				<div className="">
					<h6 className="text-[var(-text-colour-light-grey)]">Time</h6>
					<h4 className="">12:00 PM</h4>
				</div>

				<div className="flex gap-4 w-full">
					<button className="text-white rounded-md bg-[var(--oex-orange)] py-4 text-center flex-1">
						Download receipt
					</button>
					<button className="border rounded-md border-[var(--oex-orange)] text-[var(--oex-orange)] py-4 text-center flex-1">
						Add to calender
					</button>
				</div>
			</div>
		</div>
	);
};

export default BookingConfirmed;
