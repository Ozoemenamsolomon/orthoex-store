import Link from 'next/link';
import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useCart } from '../../context/cartContext.tsx';
import { insertBooking } from '../../utils/rehabspcetable.js';
import { usePaystackPayment } from 'react-paystack';
// import {toast} from 'toastify'

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
	const summary = sumOrderList(rehabspacePayment?.selectedSessions);

	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState('');

	const config = {
		// reference: (new Date()).getTime().toString(),
		email: rehabspacePayment?.email,
		sessions: summary?.totalSessions,
		amount: summary?.total * 100,
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY_O,
		firstName: rehabspacePayment?.firstName,
		lastName: rehabspacePayment?.lastName,
		phone: rehabspacePayment?.phoneNumber,
	};

	const onSuccess = reference => {
		console.log(reference);
		setSuccess(reference);
	};

	const onClose = reference => {
		console.log(reference);
	};

	const initializePayment = usePaystackPayment(config);

	const handleClick = async () => {
		try {
			setLoading(true);
			initializePayment(onSuccess, onClose);
		} catch (error) {
			console.error('catch error==', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="inset-0 fixed flex w-full h-full  justify-center items-center z-50 bg-[var(--oex-lightest-grey)] px-2">
			{success && (
				<SuccessFulPayment setSuccess={setSuccess} success={success} />
			)}
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
						{loading ? <p>Submiting...</p> : <div>Pay N{summary?.total}</div>}
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

export const SuccessFulPayment = ({ setSuccess, success }) => {
	const router = useRouter();

	return (
		<div className="inset-0 fixed flex  justify-center items-center z-50 bg-[var(--oex-lightest-grey)] px-2">
			<div className="h-96 w-full sm:w-96 text-white bg-[var(--oex-orange)] rounded-lg p-6  flex justify-center flex-col gap-6">
				<h4>{'Payment complete! Reference ID: ' + success?.reference}</h4>
				<div className="flex w-full justify-center gap-4">
					<button
						onClick={() => {
							setSuccess('');
							router.push(`/rehabspace`);
						}}
						type="button"
						className="mt-4 rounded-md w-full bg-orange-600  text-center py-4 px-8 hover:bg-orange-500  duration-300">
						Go Rehabspace
					</button>
				</div>
			</div>
		</div>
	);
};
