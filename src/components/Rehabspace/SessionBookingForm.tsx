'use client';

import React, { useState , useEffect} from 'react';
import { sumOrderList } from './OrderSummary';
import { useCart } from '../../context/cartContext';
import { fetchBookingPrices, fetchCustomer, } from '../../utils/rehabspcetable';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import { BookingPrice } from '../../data/rehabspace/types';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';

interface FormErrors {	
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  selectedSessions?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  selectedSessions: BookingPrice[];
}


const SessionBookingForm: React.FC = () => {
	const { setRehabspacePayment } = useCart();
	const router = useRouter();
	const {user}=useUser()

	const [isLoading, setIsLoading] = useState(false);
	const [sessionPrices, setSessionPrices] = useState<BookingPrice[]>([]);
	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
		phoneNumber: '',
		email: user?.email || '',
		selectedSessions: [sessionPrices[0]],
	});

	const [formErrors, setFormErrors] = useState<FormErrors>({
		firstName: '',
		lastName: '',
		phoneNumber: '',
		email: '',
	});

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const { data: customerData, error: customerError } = await fetchCustomer(user?.email);
	  
			const { data: pricesData, error: pricesError } = await fetchBookingPrices();

			if (pricesData) {
			  setSessionPrices(pricesData);
			  setFormData({ 
					...formData, 
					firstName: customerData && customerData[0]?.firstName || '',
					lastName: customerData && customerData[0]?.lastName || '',
					phoneNumber: customerData && customerData[0]?.phoneNumber || '',
					selectedSessions: [pricesData[0]], 
					email: user?.email || ''
				});
			} else {
			  console.log({pricesError});
			}
		  } catch (error) {
			console.log(error);
		  }
		};
	  
		fetchData();
	  }, [user]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)  => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setFormErrors({ ...formErrors, [name]: '' });
	};

	const handleSessionSelection = (session: BookingPrice) => {
		// Check if the session is already selected
		if (
			formData?.selectedSessions?.some(selected => selected?.plan === session?.plan)
		) {
			// If selected, remove it
			setFormData({
				...formData,
				selectedSessions: formData.selectedSessions.filter(
					selected => selected?.id !== session?.id,
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
		const errors: any = {};
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

	const { total,} = sumOrderList(formData?.selectedSessions);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=> {
		e.preventDefault();
		
		if (validateForm()) {
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
				setIsLoading(false)
			}
		}
	};

	const inputstyle = `appearance-none border rounded-sm w-full py-4 px-3 text-gray-700 leading-tight focus:outline-orange-500 focus:shadow-outline focus:bg-transparent bg-transparent`;

	return (
		<form onSubmit={handleSubmit} className="">
			{formErrors.selectedSessions ? (
				<p className="text-red-500 text-sm ">{formErrors.selectedSessions}</p> 
			) : null}

			<div className="w-full grid sm:grid-cols-2 gap-4">
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
						value={formData.email || ''}
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
					{sessionPrices?.map(session => (
						<button
							key={session?.id?.toString()}
							type="button"
							onClick={() => handleSessionSelection(session)}
							className={`py-3 px-6 rounded-full focus:outline-none focus:shadow-outline ${
								formData.selectedSessions.some(
									selected => selected?.id === session?.id,
								)
									? 'bg-orange-500 text-white'
									: 'border border-gray-400 text-gray-700 hover:border-gray-700 duration-300'
							}`}>
							{session?.plan}
						</button>
					))}
				</div>
				<p className="text-gray-500 pt-2">* A session duration is 1hr 20mins</p>
			</div>

			<div className="p-4 py-6 mb-6 mt-8 border border-gray-00 rounded-lg ">
				<h5 className="font-semibold">Order summary</h5>
				{formData?.selectedSessions?.length !== 0 ? (
					<>
						{formData.selectedSessions.map((selected, i) => (
							<div className="flex justify-between items-center" key={i}>
								<div className="">{selected?.plan}</div>
								<div className="">{selected?.price.toLocaleString('en-US')}</div>
							</div>
						))}
						<div className="flex justify-between items-center pt-1 mt-1 border-t border-gray-300">
							<div className="">Total value:</div>
							<div className="">₦{total.toLocaleString('en-US')}</div>
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
							className={`px-8 py-4 font- rounded-md text-white bg-[var(--oex-orange)]  ${
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
								className={`px-8 py-4 font- rounded-md text-white bg-[var(--oex-orange)]  ${
									isLoading ? 'opacity-50 cursor-not-allowed' : ''
								}`}
								disabled={isLoading}>
								{isLoading ? (
									'Submitting...'
								) : (
									<Link  className="flex gap-2" href='/api/auth/login?returnTo=/rehabspace?pay=1'>
										Proceed to signin
									</Link>
								)}
							</button>
						</div>
						
				}

				
			</div>
		</form>
	);
};

export default SessionBookingForm;
