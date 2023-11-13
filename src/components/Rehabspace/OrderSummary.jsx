import Link from 'next/link';
import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useCart } from '../../context/cartContext.tsx';
import { insertBooking } from '../../utils/rehabspcetable.js';

export function sumOrderList(orderList) {
	let total = 0,
		totalSessions = 0;
	if (orderList && orderList.length !== 0) {
		for (const order of orderList) {
			// Extract the numerical value from the "value" key
			const numericValue = parseFloat(order.value.replace(/[^0-9.]/g, ''));
			// const numericValue2 = parseFloat(order.session.replace(/[^0-9.]/g, ''));

			// Add the numeric value to the total
			total += numericValue;
			totalSessions += order?.session;
		}
		return { total, totalSessions };
	}
}

const OrderSummary = () => {
	const { rehabspacePayment, setRehabspacePayment } = useCart();
	const { total, totalSessions } = sumOrderList(
		rehabspacePayment?.selectedSessions,
	);

	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		try {
			setLoading(true);
			const bookingData = {
				email: rehabspacePayment?.email,
				firstName: rehabspacePayment?.firstName,
				lastName: rehabspacePayment?.lastName,
				phone: rehabspacePayment?.phoneNumber,
				cart: rehabspacePayment?.selectedSessions,
				amountPaid: total,
				sessions: totalSessions,
				paid: true,
			};
			const data = await insertBooking(bookingData);
			if (data.success) {
				alert('Data inserted successfully');
			}
			console.log('SESSION DATA==', data, '===', rehabspacePayment);
		} catch (error) {
			console.error('catch error==', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="inset-0 fixed flex w-full h-full  justify-center items-center z-50 bg-[var(--oex-lightest-grey)] px-2">
			<div className="w-full sm:w-[450px] rounded-md bg-[var(--oex-off-white)] py-10 px-4  ">
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
						onClick={handleClick}
						className={`w-full flex items-center justify-center gap-4 px-8 py-4 rounded-md text-white bg-[var(--oex-orange)] hover:bg-[var(--oex-orange-dark)] duration-300`}>
						<div>
							<FaLock />
						</div>
						{loading ? <p>Submiting...</p> : <div>Pay N{total}</div>}
					</button>
					<button
						onClick={() => router.push(`/rehabspace`)}
						type="button"
						className="mt-4 rounded-md w-full bg-gray-200 text-center py-4 px-8 hover:bg-gray-400 duration-300">
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
