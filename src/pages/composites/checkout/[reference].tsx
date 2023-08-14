import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import CTA from '@components/CTA';
import CartItem from '@components/CartItem';
import { priceFormatter } from '@components/ProductCard';
import { supabaseClient } from '@utils/supabase';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
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
	const router = useRouter();
	const [isSuccessful, setIsSuccessful] = useState(false);
	const [address, setAddress] = useState({
		street: '',
		number: '',
		city: '',
		state: '',
		country: '',
	});
	const [phone, setPhone] = useState('');

	const isxpired = new Date(order.expiresAt).getTime() < Date.now();

	/**
	 *
	 * @param reference - transaction reference
	 * @returns void
	 * @description - this function is called when the transaction is successful
	 *
	 */
	const onSuccess = (reference: any) => {
		// send reference to backend to verify transaction
		fetch('/api/verify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ reference, address, phone }),
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

							if (isxpired || !phone) {
								return;
							}

							// @ts-ignore
							initializePayment(onSuccess, onClose);
						}}>
						<input
							type="text"
							placeholder="Street"
							value={address.street}
							onChange={e => setAddress({ ...address, street: e.target.value })}
						/>
						<input
							type="text"
							placeholder="Number"
							value={address.number}
							onChange={e => setAddress({ ...address, number: e.target.value })}
						/>
						<input
							type="text"
							placeholder="City"
							value={address.city}
							onChange={e => setAddress({ ...address, city: e.target.value })}
						/>
						<input
							type="text"
							placeholder="State"
							value={address.state}
							onChange={e => setAddress({ ...address, state: e.target.value })}
						/>
						<input
							type="text"
							placeholder="Country"
							value={address.country}
							onChange={e =>
								setAddress({ ...address, country: e.target.value })
							}
						/>
						<input
							type="text"
							placeholder="Phone"
							value={phone}
							onChange={e => setPhone(e.target.value)}
						/>
						<CTA>
							{isxpired
								? 'Order Expired'
								: `Pay ${priceFormatter.format(order.totalPrice)}`}
						</CTA>
					</form>

					<div>
						{order?.cart?.map((item: any, index: any) => (
							<CartItem readOnly key={`checkout-item-${index}`} {...item} />
						))}
					</div>
				</>
			)}
		</>
	);
};

export default CheckoutPage;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const { reference } = ctx.query;

		const { data, error } = await supabaseClient
			.from('orders')
			.select('*')
			.eq('reference', reference)
			.eq('paid', false)
			.eq('delivered', false)
			.gt('expiresAt', new Date().toISOString())
			.single();

		if (error) {
			console.log(error);
		}

		console.log({ data });

		if (!data) {
			return {
				redirect: {
					destination: `/account/orders`,
					permanent: false,
				},
			};
		}

		return {
			props: {
				order: data,
			},
		};
	},
});