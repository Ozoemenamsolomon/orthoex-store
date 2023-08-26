import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import CTA from '@components/CTA';
import { priceFormatter } from '@components/ProductCard';
import { getUnpaidOrder } from '@data/index';
import { NextPage } from 'next';
import router from 'next/router';
import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';

const onClose = () => {
	console.log('closed');
};

const CheckoutPage: NextPage<{ order: any; user: UserProfile }> = ({
	order,
	user,
}) => {
	const config = {
		reference: order.reference,
		email: user?.email || '',
		amount: order.totalPrice * 100,
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || '',
	};

	const initializePayment = usePaystackPayment(config);
	const [isSuccessful, setIsSuccessful] = useState(false);

	const isxpired = new Date(order.expiresAt).getTime() < Date.now();

	/**
	 *
	 * @param reference - transaction reference
	 * @returns void
	 * @description - this function is called when the transaction is successful
	 *
	 */
	const onSuccess = (reference: any) => {
		fetch('/api/verify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ reference }),
		})
			.then(res => res.json())
			.then(data => {
				setIsSuccessful(true);
				router.push('/account/orders');
			})
			.catch(err => {
				console.log(err);
				setIsSuccessful(false);
			});
	};

	return (
		<>
			<h1>Checkout Page</h1>

			{isSuccessful ? (
				<div>
					<h1>Order Successful</h1>
				</div>
			) : (
				<>
					<form
						onSubmit={e => {
							e.preventDefault();

							if (isxpired) {
								return;
							}

							// @ts-ignore
							initializePayment(onSuccess, onClose);
						}}>
						<CTA>
							{isxpired
								? 'Order Expired'
								: `Pay ${priceFormatter.format(order.totalPrice)}`}
						</CTA>
					</form>
				</>
			)}
		</>
	);
};

export default CheckoutPage;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const { reference } = ctx.query;

		if (typeof reference !== 'string') {
			return {
				redirect: {
					destination: `/account/orders`,
					permanent: false,
				},
			};
		}

		const order = await getUnpaidOrder(reference);

		if (!order) {
			return {
				redirect: {
					destination: `/account/orders`,
					permanent: false,
				},
			};
		}

		return {
			props: {
				order,
			},
		};
	},
});
