import PlayLibraryIcon from '@assets/new/icons/PlayLibraryIcon';
import Coupon from '@assets/new/icons/account/Coupon.svg';
import DeliveryTruck from '@assets/new/icons/account/DeliveryTruck.svg';
import Favourite from '@assets/new/icons/account/Favourite.svg';
import Feedback from '@assets/new/icons/account/Feedback.svg';
import Gift from '@assets/new/icons/account/Gift.svg';
import RecentlyViewed from '@assets/new/icons/account/RecentlyViewed.svg';
import ShoppingBag from '@assets/new/icons/account/ShoppingBag.svg';
import SupportAgent from '@assets/new/icons/account/SupportAgent.svg';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import AccountSubNav from '@components/AccountSubNav';
import CTA, { CTALink } from '@components/CTA';
import OrderItemCard from '@components/OrderItemCard';
import ServiceCard, { ServiceCardType } from '@components/ServiceCard';
import TrainingOrder from '@components/TrainingOrder';
import Details from '@components/account/Details';
import { Container } from '@components/styled';
import { Title } from '@components/styled/Temp';
import {
	TypeOfSlug,
	accountSubLinks,
	isAccountSubLinkSlug,
} from '@data/accountSublinks';
import { TrainingOrderType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { supabaseClient, supabaseTrainingClient } from '@utils/supabase';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { format } from 'url';

import RehabspaceAccount from "@components/Rehabspace/Account"
import {fetchAll, fetchRow} from "@utils/rehabspcetable"

const accountOverviewLinks: ServiceCardType[] = [
	{
		image: Favourite,
		description: 'Saved items',
	},
	{
		image: Gift,
		description: 'Invite friend',
	},
	{
		image: RecentlyViewed,
		description: 'Viewed',
	},
	{
		image: Coupon,
		description: 'Store wallet',
	},
];

const accountProductLinks: ServiceCardType[] = [
	{
		image: DeliveryTruck,
		description: 'Delivery',
	},
	{
		image: Feedback,
		description: 'Feedback',
	},
	{
		image: ShoppingBag,
		description: 'Orders',
	},
	{
		image: SupportAgent,
		description: 'Support',
	},
];

type TrainingOrderDataProps = {
	trainings: TrainingOrderType[];
	title: string;
};

type RehabspaceDataProps = {
	location: any,
	holidays: any,
	bookingPrice: any,
	activityHistory: any,
	title: string;
};

type Props = {
	user: UserProfile;
	customerDetails: any;
	data: {
		orders: any[];
		title: string;
	};
	trainingData: TrainingOrderDataProps;
	rehabspaceData: RehabspaceDataProps;
};

const Account: NextPage<Props> = ({ user,customerDetails, data, trainingData, rehabspaceData }) => {
	const router = useRouter();
	const slug = router.query.slug as TypeOfSlug;

	return (
		<Container
			verticalPaddingInREM={2}
			style={{
				display: 'flex',
				gap: '2rem',
				alignItems: 'flex-start',
			}}>
			<AccountSubNav />

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '2rem',
					flex: 1,
				}}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						boxShadow: '2px 2px 9px 1px rgb(0 0 0 / 10%)',
						padding: '1rem',
						paddingBottom: '2rem',
					}}>
					<Title>{data.title}</Title>

					{slug === 'overview' ? (
						<Overview />
					) : slug === 'orders' ? (
						<Orders orders={data.orders} />
					) : slug === 'trainings' ? (
						<TrainingOrders trainingOrders={trainingData.trainings} />
					) : slug === 'rehabspace' ? (
						<RehabspaceAccount user={user} customer={customerDetails} rehabspaceData={rehabspaceData}/>
					) : slug === 'details' ? (
						<Details
							user={user}
							customer={customerDetails}
							savedUserData={{
								phone: '08012345678',
								profession: 'Software Engineer',
								firstName: 'John',
								lastName: 'Doe',
								birthday: '1990-01-01',
								gender: 'male',
							}}
						/>
					) : slug === 'password' ? (
						<ResetPassword />
					) : null}
				</div>
				{slug === 'overview' && <Overview2 />}
			</div>
		</Container>
	);
};

export default Account;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps({ query, res, req }) {
		if (!isAccountSubLinkSlug(query.slug)) {
			return {
				redirect: {
					destination: '/account/overview',
					permanent: false,
				},
			};
		}

		const session = await getSession(req, res);

		const {data: customer} = await fetchRow('customers', 'customerEmail', session?.user?.email)
		console.log('customer=====', customer)

		const data = {
			orders: [],
			title:
				accountSubLinks.find(({ slug }) => slug === query.slug)?.name || '',
		};

		if (query.slug === 'orders') {
			const { data: orders, error } = await supabaseClient
				.from('orders')
				.select('id, created_at, totalPrice, cart, reference, paid, expiresAt')
				.eq('user', session?.user.email)
				.order('created_at', { ascending: false });

			data.orders = orders as any;
			if (error) {
				console.log({type: 'orders', error });
				data.orders = [];
			}
		}
		const trainingData: TrainingOrderDataProps = {
			trainings: [],
			title:
				accountSubLinks.find(({ slug }) => slug === query.slug)?.name || '',
		};

		if (query.slug === 'trainings') {
			const { data: trainingOrderData, error } = await supabaseTrainingClient
				.from('training_orders')
				.select('*')
				.eq('user', session?.user.email)
				.order('createdAt', { ascending: false });

			if (error) {
				console.log({type: 'trainings', error });
				trainingData.trainings = [];
			}

			trainingData.trainings = trainingOrderData as TrainingOrderType[];
			if (error) {
				console.log({ error });
				trainingData.trainings = [];
			}
		}

		const rehabspaceData: RehabspaceDataProps = {
			location: [],
			holidays: [],
			bookingPrice: [],
			activityHistory: [],
			title:
				accountSubLinks.find(({ slug }) => slug === query.slug)?.name || '',
		};

		if (query.slug === 'rehabspace') {
			const holidays = await fetchAll('holidays')
			const location= await fetchAll('location')
			const bookingPrice = await fetchAll('bookingPrice')
			const activityHistory = await fetchRow('activityHistory', 'customerEmail', session?.user?.email)
			console.log('rehabspace===', { holidays, location, bookingPrice, activityHistory })
			rehabspaceData.location = location as any;
			rehabspaceData.holidays = holidays as any;
			rehabspaceData.bookingPrice = bookingPrice as any;
			rehabspaceData.activityHistory = activityHistory as any;
			// if (error) {
			// 	console.log({type: 'rehabspace location:', error });
			// 	rehabspaceData.location = [];
			// }
		}

		return {
			props: {
				data,
				trainingData,
				rehabspaceData,
				user: session?.user,
				customerDetails: customer[0] || {}
			},
		};
	},
});

const Overview = () => {
	return (
		<div
			style={{
				display: 'flex',
			}}>
			{accountOverviewLinks.map((card, index) => (
				<ServiceCard
					small
					greyFont
					className="no-shadow no-padding"
					key={index}
					service={card}
				/>
			))}
		</div>
	);
};

const Overview2 = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				boxShadow: '2px 2px 9px 1px rgb(0 0 0 / 10%)',
				padding: '1rem',
				paddingBottom: '2rem',
			}}>
			<Title>Product</Title>
			<div
				style={{
					display: 'flex',
				}}>
				{accountProductLinks.map((card, index) => (
					<ServiceCard
						small
						greyFont
						className="no-shadow no-padding"
						key={index}
						service={card}
					/>
				))}
			</div>
		</div>
	);
};

const Orders: FC<{
	orders: any[];
}> = ({ orders }) => {
	const [paid, setPaid] = useState(false);

	const paidOrders = orders.filter(order => order.paid);
	const unpaidOrders = orders.filter(order => !order.paid);

	return (
		<>
			<OrderFilterButtons>
				<button
					onClick={() => setPaid(false)}
					className={!paid ? 'active' : ''}>
					Unpaid Orders
					<span>{unpaidOrders.length}</span>
				</button>
				<button onClick={() => setPaid(true)} className={paid ? 'active' : ''}>
					Paid Orders
					<span>{paidOrders.length}</span>
				</button>
			</OrderFilterButtons>

			{paid ? (
				<div>
					{paidOrders.map((order, index) => (
						<OrderItemCard key={index} {...order} />
					))}
				</div>
			) : (
				<div>
					{unpaidOrders.map((order, index) => (
						<OrderItemCard key={index} {...order} />
					))}
				</div>
			)}
		</>
	);
};
const TrainingOrders: FC<{
	trainingOrders: TrainingOrderType[];
}> = ({ trainingOrders }) => {
	const [paidTab, setPaidTab] = useState(false);
	const { push, pathname, query } = useRouter();

	const paidOrders = trainingOrders.filter(trainingOrder => trainingOrder.paid);
	const unpaidOrders = trainingOrders.filter(
		trainingOrder => !trainingOrder.paid,
	);

	const deleteTrainingWithId = async (reference: string) => {
		fetch('/api/training-order', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ reference }),
		})
			.then(res => res.json())
			.then(data => {
				toast.success('Training Order deleted');
				push(format({ pathname, query }));
			})
			.catch(err => {
				console.log(err);
				toast.error('Training Order could not be deleted');
			});
	};

	return (
		<TrainingOrderWrapper>
			<OrderFilterButtons>
				<button
					onClick={() => setPaidTab(true)}
					className={paidTab ? 'active' : ''}>
					Paid Trainings
					<span>{paidOrders.length}</span>
				</button>
				<button
					onClick={() => setPaidTab(false)}
					className={!paidTab ? 'active' : ''}>
					Unpaid Trainings
					<span>{unpaidOrders.length}</span>
				</button>
			</OrderFilterButtons>

			{paidTab ? (
				paidOrders.length > 0 ? (
					<div>
						{paidOrders.map(order => (
							<TrainingOrder key={order.id} training={order} />
						))}
					</div>
				) : (
					<BookTraining />
				)
			) : (
				<div>
					{unpaidOrders.map(order => (
						<TrainingOrder
							key={order.id}
							training={order}
							deleteTraining={deleteTrainingWithId}
						/>
					))}
				</div>
			)}
		</TrainingOrderWrapper>
	);
};

const BookTraining = () => {
	return (
		<BookTrainingWrapper>
			<div className="icon">
				<PlayLibraryIcon />
			</div>
			<p className="info">
				There is nothing to report. You have not purchased any training so far.
			</p>
			<CTALink className="book-btn no-animate" href={'/trainings'}>
				Book a Training
			</CTALink>
		</BookTrainingWrapper>
	);
};

const BookTrainingWrapper = styled.div`
	text-align: center;
	min-height: 300px;

	& .icon {
		margin-bottom: 1.5rem;
	}
	& .info {
		margin-bottom: 1.5rem;
		color: var(--text-colour-grey);
	}
	& .book-btn {
		width: 100%;
		padding: 1rem 2rem;
		font-size: 1rem;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		& .book-btn {
			width: 50%;
		}
	}
`;
const TrainingOrderWrapper = styled.div`
	min-height: 300px;

	@media ${({ theme }) => theme.breakpoints.above.md} {
	}
`;

const OrderFilterButtons = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 1rem;

	& > button {
		cursor: pointer;
		border: none;
		background: none;
		display: flex;
		align-items: center;
		padding-bottom: 0.5rem;

		& > span {
			margin-left: 0.5rem;
			padding: 0.25rem 0.5rem;
			border-radius: 0.1rem;
			background: var(--oex-grey);
			color: white;
			font-weight: 600;
		}

		&.active {
			color: var(--oex-orange);
			border-bottom: 2px solid var(--oex-orange);

			& > span {
				background: var(--oex-orange);
				color: white;
			}
		}
	}
`;

const ResetPassword = () => {
	const [passwordResetEmailSent, setPasswordResetEmailSent] = useState(false);

	return (
		<form
			onSubmit={async e => {
				e.preventDefault();
				const response = await fetch('/api/auth/reset-password', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				if (response.ok) {
					setPasswordResetEmailSent(true);
					toast.success('Password reset email sent!');
				} else {
					setPasswordResetEmailSent(false);
					console.log({ response });
					toast.error('Something went wrong trying to reset password');
				}
			}}>
			<p>We will send you an email to reset your password.</p>
			{!passwordResetEmailSent ? (
				<CTA>Send password reset email</CTA>
			) : (
				<p>Check your email for the password reset link</p>
			)}
		</form>
	);
};
