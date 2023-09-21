import ArrowBack from '@assets/new/icons/ArrowBack';
import KeyLock from '@assets/new/icons/KeyLockIcon';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import CTA from '@components/CTA';
import { priceFormatter } from '@components/ProductCard';
import { getUnpaidTrainingOrder } from '@data/trainingOrderSupabase';
import { TrainingOrderType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { NextPage } from 'next';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import styled from 'styled-components';

const onClose = () => {
	console.log('closed');
};

const CheckoutPage: NextPage<{
	trainingOrder: TrainingOrderType;
	user: UserProfile;
}> = ({ trainingOrder, user }) => {
	const config = {
		reference: trainingOrder.reference,
		email: user?.email || '',
		amount: trainingOrder.amountPaid * 100,
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || '',
	};

	const initializePayment = usePaystackPayment(config);
	const [isSuccessful, setIsSuccessful] = useState(false);

	const isxpired = new Date(trainingOrder.expiredAt).getTime() < Date.now();

	/**
	 *
	 * @param reference - transaction reference
	 * @returns void
	 * @description - this function is called when the transaction is successful
	 *
	 */
	const onSuccess = (reference: any) => {
		fetch('/api/verify-training', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ reference }),
		})
			.then(res => res.json())
			.then(data => {
				setIsSuccessful(true);
				router.push('/training/checkout');
			})
			.catch(err => {
				console.log(err);
				setIsSuccessful(false);
			});
	};

	const onPaymentClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		if (isxpired) {
			return;
		}
		// @ts-ignore
		initializePayment(onSuccess, onClose);
	};

	return (
		<>
			{isSuccessful ? (
				<div>
					<h5>Order</h5>
					<p>Order Successful</p>
				</div>
			) : (
				<OrderSummary>
					<span className="back-btn">
						<Link href={'/trainings/checkout'}>
							<ArrowBack />
						</Link>
					</span>
					<h5 className="heading">Order summary</h5>
					<OrderInfo>
						<h5 className="title">Orders</h5>
						<OrderDetails>
							<span className="description">1x Subtotal</span>
							<span className="amount">
								{priceFormatter.format(trainingOrder.trainingPrice)}
							</span>
						</OrderDetails>
						<OrderDetails>
							<span className="description">1x Discount</span>
							<span className="amount">
								- {priceFormatter.format(trainingOrder.discount)}
							</span>
						</OrderDetails>
						<OrderDetails>
							<span className="description">Total</span>
							<span className="amount">
								{priceFormatter.format(trainingOrder.amountPaid)}
							</span>
						</OrderDetails>
					</OrderInfo>

					<CTA onClick={onPaymentClick} className="no-animat order-btn">
						<span>
							<KeyLock />
						</span>
						<span>Pay {priceFormatter.format(trainingOrder.amountPaid)}</span>
					</CTA>
				</OrderSummary>
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
					destination: `/trainings/checkout`,
					permanent: false,
				},
			};
		}

		const trainingOrder = await getUnpaidTrainingOrder(reference);

		if (!trainingOrder) {
			return {
				redirect: {
					destination: `/trainings/checkout`,
					permanent: false,
				},
			};
		}

		return {
			props: {
				trainingOrder,
			},
		};
	},
});

const OrderSummary = styled.div`
	height: 100vh;
	position: relative;
	padding: 2rem;

	& .back-btn {
		cursor: pointer;
		font-size: 2rem;
	}

	& .heading {
		font-weight: 500;
		font-size: 1.3rem;
		margin: 1rem 0;
	}

	& .order-btn {
		display: flex;
		gap: 10px;
		width: 100%;
		align-items: center;
		justify-content: center;
		padding: 10px 15px;
		border: 1px solid var(--oex-orange);
		margin-top: 3rem;
	}
`;
const OrderInfo = styled.div`
	background-color: var(--oex-off-white);
	padding: 2rem 1rem;

	& .title {
		margin: 0;
		font-weight: 500;
		font-size: 1.2rem;
	}
`;
const OrderDetails = styled.div`
	display: flex;
	gap: 2rem;
	justify-content: space-between;
	margin: 1rem 0;
	font-size: 1.2rem;

	&:last-child {
		margin: 0;
	}

	& .description {
		color: var(--text-colour-grey);
	}
	& .amount {
		font-weight: 600;
	}
`;
