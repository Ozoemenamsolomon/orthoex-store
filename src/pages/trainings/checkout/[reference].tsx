import ArrowBack from '@assets/new/icons/ArrowBack';
import CheckMark from '@assets/new/icons/CheckMark';
import KeyLock from '@assets/new/icons/KeyLockIcon';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import CTA, { CTALink } from '@components/CTA';
import { priceFormatter } from '@components/ProductCard';
import { getUnpaidTrainingOrder } from '@data/trainingOrderSupabase';
import { TrainingOrderType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { formatDate, formatTime } from '@utils/index';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { toast } from 'react-toastify';
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
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_LVE_KEY || '',
	};

	const initializePayment = usePaystackPayment(config);
	const [isSuccessful, setIsSuccessful] = useState(false);

	const isxpired = new Date(trainingOrder.expiredAt).getTime() < Date.now();

	const updateTrainingOrderData = async () => {
		await fetch('/api/training-order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ reference: trainingOrder.reference }),
		})
			.then(res => res.json())
			.then(data => {
				setIsSuccessful(true);
			})
			.catch(err => {
				console.log(err);
				setIsSuccessful(false);
			});
	};
	const updateTrainingData = async () => {
<<<<<<< HEAD
<<<<<<< HEAD
		await fetch('/api/update-training-bookedspot', {
			method: 'POST',
=======
		await fetch('/api/training-spot', {
			method: 'PUT',
>>>>>>> efc9d516a1b0483982531c700c19ea7a663b7c20
=======
		await fetch('/api/update-training-bookedspot', {
			method: 'POST',
>>>>>>> 4b087e838ccaa002c15ca81d6f3e5cd1241bca4d
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: trainingOrder.trainingId }),
		}).catch(err => {
			console.log(err);
		});
	};

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
			})
			.catch(err => {
				console.log(err);
				setIsSuccessful(false);
			});
	};

	const onPaymentClick = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		if (isxpired) {
			toast.error('Order is expired');
			return;
		}
		if (trainingOrder.amountPaid === 0) {
			await updateTrainingOrderData();
			await updateTrainingData();
			return;
		}
		// @ts-ignore
		initializePayment(onSuccess, onClose);
	};

	return (
		<>
			{isSuccessful ? (
				<OrderSuccess>
					<ButtonWrapper>
						<CTALink className="back-btn" href="/trainings">
							<span>
								<ArrowBack color="var(--oex-orange)" />
							</span>
							<span>Trainings</span>
						</CTALink>
					</ButtonWrapper>
					<Container>
						<Header>
							<CheckMark color="#00D685"></CheckMark>
							<ThankYouBox>
								<h5 className="title">Thanks for your order</h5>
								<span className="order-details">
									Order ID:
									<span className="order-id">#{trainingOrder?.id}</span>
								</span>
							</ThankYouBox>
						</Header>
						<OrderInfoDetails>
							<InfoTitle>
								<p className="title">You are attending</p>
								<p className="description">{trainingOrder?.title}</p>
							</InfoTitle>
							<MetaDetails>
								<MetaData>
									<span className="title">payment info:</span>
									<span className="description">{trainingOrder?.user}</span>
								</MetaData>
								<MetaData>
									<span className="title">Date:</span>
									<span className="description">{`${formatDate(
										new Date(trainingOrder?.trainingDate as string),
									)} , ${formatTime(
										new Date(trainingOrder?.trainingDate as string),
									)}`}</span>
								</MetaData>
								<MetaData>
									<span className="title">Location:</span>
									<span className="description">{trainingOrder?.location}</span>
								</MetaData>
							</MetaDetails>
							<Text>
								The training ticket and address will be sent to participants
								email.
							</Text>
						</OrderInfoDetails>
					</Container>
				</OrderSuccess>
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
							<span className="description">
								{`${trainingOrder.numOfParticipants}`}x Subtotal
							</span>
							<span className="amount">
								{priceFormatter.format(
									trainingOrder.trainingPrice * trainingOrder.numOfParticipants,
								)}
							</span>
						</OrderDetails>
						<OrderDetails>
							<span className="description">
								{`${trainingOrder.numOfParticipants}`}x Discount
							</span>
							<span className="amount">
								-{' '}
								{priceFormatter.format(
									trainingOrder.discount * trainingOrder.numOfParticipants,
								)}
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
	max-width: 600px;
	margin: 0 auto;

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

const OrderSuccess = styled.div`
	background-color: var(--oex-off-white);
	min-height: 40vh;
`;

const ButtonWrapper = styled.div`
	max-width: 700px;
	margin: 0rem auto 0;
	padding: 2rem 0rem 1rem;

	& .back-btn {
		display: flex;
		gap: 0.8rem;
		border: 1px solid var(--oex-orange);
		font-size: 0.8rem;
		padding: 0.6rem 1rem;
		color: var(--oex-orange);
		background-color: white;
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
		max-width: 700px;
		margin: 0rem auto 0;
		padding: 2rem 0rem 1rem;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: flex-start;
	padding: 1rem;
	font-size: 1.2rem;
	gap: 1rem;
	border-bottom: 2px solid var(--oex-light-grey);

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 2rem 3rem 1rem;
	}
`;
const ThankYouBox = styled.div`
	& .title {
		margin: 0;
		font-size: 1.5rem;
		margin-bottom: 0.4rem;
	}
	& .order-id {
		color: var(--oex-orange);
		font-weight: 600;
		margin-left: 0.5rem;
	}
	& .order-details {
		margin: 0;
	}
`;

const Container = styled.div`
	max-width: 700px;
	background-color: white;
	margin: 0rem auto 0;
	border-radius: 10px;
`;
const OrderInfoDetails = styled.div`
	padding: 2rem 1rem 0;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 2rem 3rem 1rem;
	}
`;

const InfoTitle = styled.div`
	& .title {
		text-transform: uppercase;
		font-weight: 500;
		font-size: 1.2rem;
	}
	& .description {
		text-transform: capitalize;
		font-weight: 700;
		font-size: 1.7rem;
		line-height: 1.4;
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
		& .description {
			font-size: 2rem;
		}
	}
`;

const MetaDetails = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 3rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;
		gap: 2rem;
		justify-content: space-between;
	}
`;
const MetaData = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1.5rem;
	gap: 0.5rem;

	& .title {
		text-transform: uppercase;
		font-weight: 600;
		font-size: 1rem;
	}
	& .description {
		color: var(--text-colour-grey);
		font-weight: 500;
		font-size: 1rem;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
	}
`;

const Text = styled.p`
	margin: 2rem 0;
`;
