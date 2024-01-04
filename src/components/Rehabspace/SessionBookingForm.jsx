'use client';
import { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { bookingDetails } from '../../data/rehabspace';
import { sumOrderList } from './OrderSummary';
import { useCart } from '../../context/cartContext.tsx';
import { insertBooking } from '../../utils/rehabspcetable.js';
import { useRouter } from 'next/router';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';

const SessionBookingForm = ({ onSubmit }) => {
	const { rehabspacePayment, setRehabspacePayment } = useCart();
	const router = useRouter();
	const {user}=useUser()

	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phoneNumber: '',
		email: user?.email,
		selectedSessions: [bookingDetails?.types[0]],
	});

	const [formErrors, setFormErrors] = useState({
		firstName: '',
		lastName: '',
		phoneNumber: '',
		email: '',
	});

	const handleInputChange = e => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		// Clear the error message when the user starts typing in the field
		setFormErrors({ ...formErrors, [name]: '' });
	};

	const handleSessionSelection = session => {
		// Check if the session is already selected
		if (
			formData.selectedSessions.some(selected => selected.type === session.type)
		) {
			// If selected, remove it
			setFormData({
				...formData,
				selectedSessions: formData.selectedSessions.filter(
					selected => selected.type !== session.type,
				),
			});
		} else {
			// If not selected, add it
			setFormData({
				...formData,
				selectedSessions: [...formData.selectedSessions, session],
			});
		}
	};

	const validateForm = () => {
		const errors = {};
		let isValid = true;

		if (!formData.firstName) {
			errors.firstName = 'First Name is required';
			isValid = false;
		}

		if (!formData.lastName) {
			errors.lastName = 'Last Name is required';
			isValid = false;
		}

		if (!formData.phoneNumber) {
			errors.phoneNumber = 'Phone Number is required';
			isValid = false;
		}

		if (!formData.email) {
			errors.email = 'Email is required';
			isValid = false;
		}

		if (formData.selectedSessions.length === 0) {
			errors.selectedSessions = 'Choose a session';
			isValid = false;
		}

		setFormErrors(errors);
		return isValid;
	};

	const { total, totalSessions } = sumOrderList(formData?.selectedSessions);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if(user){
				setRehabspacePayment(formData)
				router.push('/rehabspace/payment')
			} else {
				router.push("/api/auth/login?returnTo=/rehabspace?pay=1")
			}
		} catch (error) {
			console.log(error);
		}finally{
			setIsLoading(0)
		}
	};

	const inputstyle = `appearance-none border rounded-sm w-full py-4 px-3 text-gray-700 leading-tight focus:outline-orange-500 focus:shadow-outline focus:bg-transparent bg-transparent`;

	return (
		<form onSubmit={handleSubmit} className="">
			{formErrors.selectedSessions && (
				<p className="text-red-500 text-sm ">{formErrors.selectedSessions}</p>
			)}

		<div>
        Welcome {user?.name}! <a href="/api/auth/logout">Logout</a>
      </div>

			<div className="w-full grid sm:grid-cols-2 gap-6">
				<div className="mb-">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="firstName">
						First Name
					</label>
					<input
						type="text"
						name="firstName"
						value={formData.firstName}
						onChange={handleInputChange}
						className={inputstyle}
					/>
					<p className="text-red-500 text-sm mt-2">{formErrors.firstName}</p>
				</div>

				<div className="mb-">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="lastName">
						Last Name
					</label>
					<input
						type="text"
						name="lastName"
						value={formData.lastName}
						onChange={handleInputChange}
						className={inputstyle}
					/>
					<p className="text-red-500 text-sm mt-2">{formErrors.lastName}</p>
				</div>

				<div className="mb-">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="phoneNumber">
						Phone Number
					</label>
					<input
						type="text"
						name="phoneNumber"
						value={formData.phoneNumber}
						onChange={handleInputChange}
						className={inputstyle}
					/>
					<p className="text-red-500 text-sm mt-2">{formErrors.phoneNumber}</p>
				</div>

				<div className="mb-">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email">
						Email
					</label>
					<input
						type="email"
						name="email"
						value={formData.email }
						onChange={handleInputChange}
						className={inputstyle}
					/>
					<p className="text-red-500 text-sm mt-2">{formErrors.email}</p>
				</div>
			</div>

			<div className="mb-4">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="selectedSessions">
					Choose a plan
				</label>
				<div className="flex flex-wrap gap-2">
					{bookingDetails?.types?.map(session => (
						<button
							key={session?.type}
							type="button"
							onClick={() => handleSessionSelection(session)}
							className={`py-3 px-6 rounded-full focus:outline-none focus:shadow-outline ${
								formData.selectedSessions.some(
									selected => selected.type === session.type,
								)
									? 'bg-orange-500 text-white'
									: 'border border-gray-400 text-gray-700 hover:border-gray-700 duration-300'
							}`}>
							{session?.type}
						</button>
					))}
				</div>
				<p className="text-gray-500 pt-2">* A session duration is 1hr 20mins</p>
			</div>

			<div className="p-4 py-6 my-4 bg-gray-200 rounded-lg ">
				<h5 className="font-semibold">Order summary</h5>
				{formData?.selectedSessions?.length !== 0 ? (
					<>
						{formData.selectedSessions.map((selected, i) => (
							<div className="flex justify-between items-center" key={i}>
								<div className="">{selected.type}</div>
								<div className="">{selected.value}</div>
							</div>
						))}
						<div className="flex justify-between items-center pt-1 mt-1 border-t border-gray-300">
							<div className="">Total value:</div>
							<div className="">₦{total}.00</div>
						</div>
					</>
				) : (
					<p className="text-gray-500 text-sm flex items-center h-full ">
						Choose a session
					</p>
				)}
			</div>

			<div className=" ">
				{
					user ? 
						<button
							type="submit"
							className={`px-8 py-4 font- rounded-md text-white bg-[var(--oex-orange)] hover:bg-[var(--oex-orange-dark)] duration-300 ${
								isLoading ? 'opacity-50 cursor-not-allowed' : ''
							}`}
							disabled={isLoading}>
							{isLoading ? (
								'Submitting...'
							) : (
								<div className="flex gap-2">
									Proceed <FaLongArrowAltRight size={24} />{' '}
								</div>
							)}
						</button>
					: 
						<div className="">
							<p>You are not signed in.</p>
							<button
								type="submit"
								className={`px-8 py-4 font- rounded-md text-white bg-[var(--oex-orange)] hover:bg-[var(--oex-orange-dark)] duration-300 ${
									isLoading ? 'opacity-50 cursor-not-allowed' : ''
								}`}
								disabled={isLoading}>
								{isLoading ? (
									'Submitting...'
								) : (
									<a className="flex gap-2" href='/api/auth/login?returnTo=/rehabspace?pay=1'>
										Proceed to signin
									</a>
								)}
							</button>
						</div>
						
				}

				
			</div>
		</form>
	);
};

export default SessionBookingForm;
