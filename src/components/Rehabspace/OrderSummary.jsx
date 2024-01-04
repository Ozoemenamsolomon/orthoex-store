import React, { useEffect, useState } from 'react';
import { FaCheck, FaLock, FaMarker } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useCart } from '../../context/cartContext.tsx';
import { usePaystackPayment } from 'react-paystack';

export function sumOrderList(orderList) {
	let total = 0,
		totalSessions = 0;
	if (orderList && orderList.length !== 0) {
		for (const order of orderList) {
			const numericValue = parseFloat(order.value.replace(/[^0-9.]/g, ''));
			total += numericValue;
			totalSessions += order?.session;
		}
		return { total, totalSessions };
	}
}

const OrderSummary = () => {
	const { rehabspacePayment, setRehabspacePayment } = useCart();
	const [summary, setSummary] = useState(sumOrderList(rehabspacePayment?.selectedSessions))

	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState('');
	const [date, setDate] = useState('');

	const config = {
		email: rehabspacePayment?.email,
		sessions: summary?.totalSessions,
		amount: summary?.total * 100,
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
		firstName: rehabspacePayment?.firstName,
		lastName: rehabspacePayment?.lastName,
		phone: rehabspacePayment?.phoneNumber,
	};

	const onSuccess = reference => {
		console.log(reference);
		setSummary({...summary, reference: reference?.reference})
		setDate(new Date().toISOString())
	};

	const onClose = reference => {
		console.log(reference);
	};

	useEffect(() => {
		const insertData = async () => {
			if (date) {
				try {
					setLoading(1)
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
							}}),
						});
						if (!response.ok) {
							console.log(response.json());
							setSuccess('');
							throw new Error("session booking was not completed");
						}
						const res = await response.json();
						setSuccess(1);
						console.log('==', res)
				} catch (error) {
					console.log(error)
				}
				finally{
					setDate('')
					setLoading(0)
				}
			}
		}

	insertData()
	}, [date])
	

	useEffect(() => {
		if (!rehabspacePayment?.email) {
			router.push('/rehabspace');
		}
	}, [rehabspacePayment?.email]);

	const initializePayment = usePaystackPayment(config);

	const handleClick = async () => {
		try {
			initializePayment(onSuccess, onClose);
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
				/>
			)}
			{
				loading ? <div className="inset-0 fixed flex  justify-center items-center z-50 bg-[var(--oex-lightest-grey)] px-2">
					Loading...
				</div> : null
			}
			<div className="w-full  sm:w-[450px] rounded-md bg-zinc-200 shadow-lg  py-10 px-4  ">
				<h5 className="font-semibold pb-4">Order Summary</h5>
				<div className="mb-8 rounded-md bg-[var(--oex-lightest-grey)] px-4 pt-6 pb-2 ">
					<h5 className="font-semibold pb-2">Order</h5>
					{rehabspacePayment?.selectedSessions?.map(({ id, type, value }) => (
						<div key={id} className="flex justify-between items-center ">
							<p>{type}</p>
							<p className="font-semibold">{value}</p>
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
								? 'bg-gray-400 cursor-not-allowed'
								: 'text-white bg-[var(--oex-orange)] hover:bg-[var(--oex-orange-dark)] duration-300'
						} w-full flex items-center justify-center gap-4 px-8 py-4 rounded-md  `}>
						<div>
							<FaLock />
						</div>
						{loading ? <p>Submiting...</p> : <div>Pay ₦{summary?.total}</div>}
					</button>
					<button
						onClick={() => router.push(`/rehabspace`)}
						type="button"
						className="mt-4 rounded-md w-full bg-gray-400 text-center py-4 px-8 hover:bg-gray-500 duration-300">
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;

export const SuccessFulPayment = ({ setSuccess, success, summary }) => {
	const router = useRouter();

	return (
		<div className="inset-0 fixed flex  justify-center items-center z-50 bg-[var(--oex-lightest-grey)] px-2">
			<div className="py-10 w-full sm:w-[450px]  bg-white rounded-lg p-6  space-y-4">
				<div className="bg-green-500 w-full mx-auto rounded-full h-10 w-10 flex justify-center items-center text-xl font-bold text-white">
					<FaCheck size={24} />
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
