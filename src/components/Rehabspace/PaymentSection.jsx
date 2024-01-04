'use client';

import { FaPhone, FaPhoneAlt } from 'react-icons/fa';
import { paymentCard, bookingCard } from '../../data/rehabspace';
import BtnBasic from './Buttons';
import PaymentPopup from './PaymentPopup';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


const PaymentSection = () => {
	const [popup, setPopup] = useState(false);

	return (
		<section className="sm:section-padding pb-40">
			<div className="grid  lg:grid-cols-2 gap-10 xl:gap-20 ">
				<PaymentGrid/>
				<BookingGrid/>
			</div>

			
		</section>
	);
};

export default PaymentSection;

export const PaymentGrid = ({setShowPaymentModal}) => {
	const [popup, setPopup] = useState(false);
	
	return (
		<div className="overflow-hidden  px-4 sm:px-8 max-lg:max-w-[600px] sm:mx-auto  grid sm:flex gap-6  items-center py-10 sm:rounded-xl bg-[var(--oex-yellow-lighter)] ">
			<div className="">
				<h3>{paymentCard?.heading}</h3>
				<p>{paymentCard?.description}</p>
				<a
					href={`tel:+${paymentCard?.phoneNumber}`}
					className=" py-6 flex gap-2 items-cente">
					<div className="text-[var(--oex-orange)] hover:text-[var(--oex-orange-dark)] duration-300">
						<FaPhoneAlt size={20} />
					</div>
					<p className="hover:scale-105 duration-300">
						{paymentCard?.phoneNumber}
					</p>
				</a>

				<button
					onClick={()=>setPopup(true)}
					className="px-8 py-4 font- rounded-md text-white bg-[var(--oex-orange)] hover:bg-[var(--oex-orange-dark)] duration-300">
					{paymentCard?.btnText}
				</button>
			</div>
			<div className="">{paymentCard?.CreditCardSvg}</div>
			<PaymentPopup popup={popup} setPopup={setPopup} />
		</div>
		)
	}

export const BookingGrid = ({setShowBookingPage}) => {

	const scrollToSection = () => {
		const targetSection = document.getElementById('booking');
		if (targetSection) {
			targetSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

return (
<div className="overflow-hidden pl-4 sm:pl-8 max-lg:max-w-[600px] max-lg:mx-auto grid md:flex   sm:gap-6  items-center pt-10 rounded-xl bg-[var(-oex-off-white)] ">
<div className="sm:pb-8">
	<h3 className="">{bookingCard?.heading}</h3>
	<p className="sm:pb-6 max-lg:pr-6">{bookingCard?.description}</p>

	<div className="flex">
		<button
			onClick={()=>setShowBookingPage()}
			className={`px-8 py-4 font- rounded-md text-white bg-[var(--oex-orange)] hover:bg-[var(--oex-orange-dark)] duration-300`}>
			Book session
		</button>
	</div>
</div>
<div  className="translate-y-[10px] flex justify-end ">
	{bookingCard?.CreditCardSvg}
</div>
</div>
)}
