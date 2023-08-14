import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import OrderItemCard from '@components/OrderItemCard';
import { Container } from '@components/styled';
import { Title } from '@components/styled/Temp';
import {
	TypeOfSlug,
	accountSubLinks,
	isAccountSubLinkSlug,
} from '@data/accountSublinks';
import { supabaseClient } from '@utils/supabase';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Coupon from '@assets/new/icons/account/Coupon.svg';
import Favourite from '@assets/new/icons/account/Favourite.svg';
import Gift from '@assets/new/icons/account/Gift.svg';
import RecentlyViewed from '@assets/new/icons/account/RecentlyViewed.svg';

import DeliveryTruck from '@assets/new/icons/account/DeliveryTruck.svg';
import Feedback from '@assets/new/icons/account/Feedback.svg';
import ShoppingBag from '@assets/new/icons/account/ShoppingBag.svg';
import SupportAgent from '@assets/new/icons/account/SupportAgent.svg';
import AccountSubNav from '@components/AccountSubNav';
import ServiceCard, { ServiceCardType } from '@components/ServiceCard';
import { FC } from 'react';

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

type Props = {
	user: UserProfile;
	data: {
		orders: any[];
		title: string;
	};
};

const Account: NextPage<Props> = ({ user, data }) => {
	const router = useRouter();
	const slug = router.query.slug as TypeOfSlug;

	return (
		<Container
			verticalPaddingInREM={2}
			style={{
				display: 'flex',
				gap: '2rem',
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
						padding: '2rem 1rem',
					}}>
					<Title>{data.title}</Title>

					{slug === 'overview' ? (
						<Overview />
					) : slug === 'orders' ? (
						<Orders orders={data.orders} />
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
				console.log({ error });
				data.orders = [];
			}
		}

		return {
			props: {
				data,
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
				padding: '2rem 1rem',
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
	return (
		<>
			<p>
				{orders.length} order{orders.length > 1 ? 's' : ''}
			</p>
			{orders.map(order => (
				<OrderItemCard key={order.id} {...order} />
			))}
		</>
	);
};
