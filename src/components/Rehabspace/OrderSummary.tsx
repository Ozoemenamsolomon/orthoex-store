import React, { useEffect, useState } from 'react';
import { FaCheck, FaLock, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useCart } from '../../context/cartContext';
import { usePaystackPayment } from 'react-paystack';
import { useUser } from '@auth0/nextjs-auth0/client';
import PageLoading from '@components/Loader/PageLoading';

export function sumOrderList(orderList:any) {
	let total = 0,
	  totalSessions = 0;
  
	if (orderList && orderList.length !== 0) {
	  for (const order of orderList) {
		const numericValue = parseFloat(order?.price);
		if (!isNaN(numericValue)) {
		  total += numericValue; 
		  const sessionValue = parseInt(order?.sessionValue, 10);
		  if (!isNaN(sessionValue)) {
			totalSessions += sessionValue;
		  } else {
			console.warn(`Invalid sessionValue for order with id ${order?.id}`);
		  }
		} else {
		  console.warn(`Invalid price for order with id ${order?.id}`);
		}
	  }
  
	  return { total, totalSessions };
	}
	return { total: 0, totalSessions: 0 };
  }
  

const OrderSummary: React.FC = () => {
	const { rehabspacePayment, } = useCart();
	const [summary, setSummary] = useState<any>(sumOrderList(rehabspacePayment?.selectedSessions))

	const {user} = useUser()

	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [date, setDate] = useState('');
	const {customerDetails} = useCart()

	const config:any = {
		email: rehabspacePayment?.email,
		sessions: summary?.totalSessions,
		amount: summary?.total * 100,
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
		firstName: rehabspacePayment?.firstName,
		lastName: rehabspacePayment?.lastName,
		phone: rehabspacePayment?.phoneNumber,
	};

	const onSuccess = (reference:any|undefined) => {
		setSummary({...summary, reference: reference?.reference})
		setDate(new Date().toISOString())
	};

	useEffect(() => {
		const insertData = async () => {
			if (date) {
				try {
					setLoading(true)
					const response = await fetch('/api/rehabspace/insert-data', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(
							{table: 'rehabspace_booking', 
							data:{
								email: rehabspacePayment?.email,
								firstName: rehabspacePayment?.firstName,
								lastName: rehabspacePayment?.lastName,
								phone: rehabspacePayment?.phoneNumber,
								cart: rehabspacePayment?.selectedSessions,
								amountPaid: summary?.total,
								sessions: summary?.totalSessions,
								paid: true,
							},
							customer: customerDetails,
							user: user,
							type: 'purchase',
						}),
						});
						if (response.ok) {
							const res = await response.json();
							setSuccess(true);
						} else {
							console.log(response.json());
							throw new Error("session booking was not completed");
						}
				} catch (error) {
					console.log(error)
				}
				finally{
					setDate('')
					setLoading(false)
				}
			}
		}

	insertData()
	}, [date])
	success

	useEffect(() => {
		if (!rehabspacePayment?.email) {
			router.push('/rehabspace');
		}
	}, [rehabspacePayment?.email]);

	const initializePayment = usePaystackPayment(config);

	const handleClick = async () => {
		try {
			initializePayment(onSuccess, );
		} catch (error) {
			console.error('catch error==', error);
		}
	};

	return (
		<div className="inset-0 fixed flex w-full h-full  justify-center items-center z-50 bg-[var(--oex-lightest-grey)] px-2">
			{success && (
				<SuccessFulPayment
					setSuccess={setSuccess}
					success={success}
					summary={summary}
					setLoading={setLoading}
				/>
			)}
			{
				loading ? <div className="inset-0 fixed flex  justify-center items-center z-50 bg-[var(--oex-lightest-grey)] px-2">
					<PageLoading/>
				</div> : null
			}
			<div className="w-full relative sm:w-[450px] rounded-md bg-gray-100 shadow-lg  py-10 px-4  ">
				<FaTimes size={20} className='cursor-pointer absolute right-10 top-8 text-gray-400' onClick={() => router.back()}/>

				<h5 className="font-semibold pb-4">Order Summary</h5>
				<div className="mb-8 border rounded-md bg-[var(--oex-lightest-gre)] px-4 pt-6 pb-2 border-gray-300">
					<h5 className="font-semibold pb-2">Order</h5>
					{rehabspacePayment?.selectedSessions?.map(({ id, plan, price }:any) => (
						<div key={id} className="flex justify-between items-center ">
							<p>{plan}</p>
							<p className="font-semibold">{price}</p>
						</div>
					))}
				</div>
				<div className="w-full">
					<button
						type="button"
						disabled={!rehabspacePayment?.email || !summary?.total}
						onClick={handleClick}
						className={`${
							!rehabspacePayment?.email || !summary?.total
								? 'bg-gray-300 text-gray-500 cursor-not-allowed'
								: 'text-white bg-[var(--oex-orange)]  '
						} w-full flex items-center justify-center gap-4 px-8 py-4 rounded-md  `}>
						<div>
							<FaLock />
						</div>
						{loading ? <p>Submiting...</p> : <div>Pay ₦{summary?.total}</div>}
					</button>
				
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;

export const SuccessFulPayment = ({ setSuccess, setLoading,  summary }:any) => {
	const router = useRouter();

	return (
		<div className="inset-0 fixed flex  justify-center items-center z-50 bg-[var(--oex-lightest-grey)] px-2">

			<div className="py-10 w-full sm:w-[450px]  bg-white rounded-lg p-6  space-y-4">

				<div className="flex flex-col justify-center gap-2 items-center ">
					<div className="bg-green-500 rounded-full h-8 w-8 flex justify-center items-center text-lg font-bold text-white">
					<FaCheck size={16} />
					</div>
					<div className="">Payment confirmed</div>

				</div>
				
				{/* {'Payment complete! Reference ID: ' + success?.reference} */}
				<div className="flex justify-between">
					<div className="text-[var(--text-colour-grey)]">Payment Method</div>
					<div className="">Bank Transfer</div>
				</div>
				<div className="flex justify-between">
					<div className="text-[var(--text-colour-grey)]">Transaction ID</div>
					<div className="">{summary?.reference}</div>
				</div>
				<div className="flex justify-between">
					<div className="text-[var(--text-colour-grey)]">
						Session purchased
					</div>
					<div className="">{summary?.totalSessions}</div>
				</div>
				<div className="flex justify-between">
					<div className="text-[var(--text-colour-grey)]">Amount Paid</div>
					<div className="">₦{summary?.total}</div>
				</div>

				<div className="flex w-full justify-center gap-4">
					<button
						onClick={() => {
							setSuccess('');
							router.push(`/account/rehabspace`);
							setLoading(1)
						}}
						type="button"
						className="mt-4 text-white rounded-md w-full bg-[var(--oex-orange)] text-center py-3 px-8 hover:bg-orange-500  duration-300">
						Go to account
					</button>
				</div>

				<div className="text-[12px] text-center px-8 text-[var(--text-colour-grey)]">
					Sessions purchased should reflect in your account and can be used at
					any RehbSpace near you.
				</div>
			</div>
		</div>
	);
};
