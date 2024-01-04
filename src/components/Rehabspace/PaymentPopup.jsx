import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import SessionBookingForm from './SessionBookingForm';
import { useRouter } from 'next/router';

const PaymentPopup = ({ popup, setPopup }) => {
	const {query, push, replace, pathname, } = useRouter()
	const stopPropagation = e => {
		e.stopPropagation();
	};

	return (
		<div
			onClick={() => {
						setPopup(false) 
						if(!pathname?.startsWith('/account')){
							push('/rehabspace')
						}
					}}
			className={`${
				popup  || query?.pay ? ' scale-100' : ' scale-0'
			}  transform transition-transform duration-500  fixed inset-0 flex justify-center  bg-opacity-50 bg-black z-50 py-10 md:items-center`}>
			<div
				onClick={stopPropagation}
				className={`overflow-y-auto relative bg-[var(--oex-off-white)] lg:w-[960px]  mx-4 w-full md:flex md:justify-between rounded-lg `}>
				<button
					onClick={() => {
						setPopup(false) 
						if(!pathname?.startsWith('/account')){
							push('/rehabspace')
						}
					}}
					className="absolute top-6 right-6 p-3 bg-[var(--oex-lightest-grey)]  hover:shadow duration-300 rounded-full z-50">
					<FaTimes />
				</button>
				<div className="md:w-2/3 p-4 py-8">
					<h4 className="font-semibold  pb-2">Pay for a session</h4>
					<SessionBookingForm />
				</div>
				<div className="md:w-1/3 md:flex relative hidden rounded-r-lg  overflow-hidden">
					<div
						className="absolute inset-0 "
						style={{
							background:
								'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(19, 17, 17, 0.37) 50%, rgba(19, 17, 17, 0.94) 100%)',
						}}></div>
					<Image
						src={'/rehabspace/office-desk.jpg'}
						width={400}
						height={600}
						alt="sessions"
						className="object-cover w-full h-full"
					/>
				</div>
			</div>
		</div>
	);
};

export default PaymentPopup;
