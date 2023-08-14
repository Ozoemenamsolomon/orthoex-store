import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import OrderItemCard from '@components/OrderItemCard';
import { Container } from '@components/styled';
import { Title } from '@components/styled/Temp';
import { supabaseClient } from '@utils/supabase';
import { NextPage } from 'next';
import Link from 'next/link';

type Props = {
	user: UserProfile;
	data: {
		orders: any[];
	};
};

const accountSubLinks = [
	{
		name: 'Overview',
		slug: 'overview',
	},
	{
		name: 'Account Details',
		slug: 'details',
	},
	{
		name: 'Orders',
		slug: 'orders',
	},
	{
		name: 'Edit Password',
		slug: 'password',
	},
	{
		name: 'Addresses',
		slug: 'addresses',
	},
	{
		name: 'Pending Reviews',
		slug: 'reviews',
	},
	{
		name: 'Recently Viewed',
		slug: 'recent',
	},
	{
		name: 'Account Manager',
		slug: 'manager',
	},
	{
		name: 'Invite a Friend',
		slug: 'invite',
	},
	{
		name: 'Reward Points & Store Wallet',
		slug: 'rewards',
	},
	{
		name: 'Newsleter Preferences',
		slug: 'newsletter',
	},
	{
		name: 'Request Account Data',
		slug: 'data',
	},
] as const;

const Account: NextPage<Props> = ({ user, data }) => {
	return (
		<Container
			style={{
				display: 'flex',
				borderRadius: '5px',
				gap: '2rem',
			}}>
			<div
				style={{
					backgroundColor: '#fff',
					borderRadius: '5px',
					padding: '1rem',
					boxShadow: '0 0 1rem rgba(0,0,0,0.1)',
					maxWidth: '300px',
				}}>
				<Title>Your OrthoEx Account</Title>
				<ul
					style={{
						padding: '0rem',
						margin: '0rem',
					}}>
					{accountSubLinks.map(({ name, slug }) => (
						<li
							style={{
								listStyle: 'none',
								padding: '0.5rem 0rem',
							}}
							key={slug}>
							<Link href={`/account/${slug}`}>{name}</Link>
						</li>
					))}
				</ul>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
					boxShadow: '0 0 1rem rgba(0,0,0,0.1)',
					padding: '1rem',
				}}>
				<Title>Overview</Title>
				{/* <CTALink href="/api/auth/logout">Logout</CTALink>
				<p>You are logeged in as {user.email} </p>
				<p>name: {user.name}</p>
				<img src={user.picture || ''} alt="user gravatar" />
				<hr /> */}
				<h2>
					{data.orders.length} order{data.orders.length > 1 ? 's' : ''}
				</h2>

				{data.orders.map(order => (
					<OrderItemCard key={order.id} {...order} />
				))}
			</div>
		</Container>
	);
};

export default Account;

type TypeOfSlug = typeof accountSubLinks[number]['slug'];

function isAccountSubLinkSlug(slug: any): slug is TypeOfSlug {
	return accountSubLinks.map(({ slug }) => slug).includes(slug);
}
// q: how can I achieve the above without using arrow function?
// a: const is

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
