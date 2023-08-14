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
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

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
			style={{
				display: 'flex',
				borderRadius: '5px',
				gap: '2rem',
			}}>
			<div
				style={{
					backgroundColor: '#fff',
					borderRadius: '5px',
					boxShadow: '0 0 1rem rgba(0,0,0,0.1)',
					maxWidth: '300px',
				}}>
				<div
					style={{
						padding: '1rem',
						paddingBottom: '0rem',
					}}>
					<Title>Your OrthoEx Account</Title>
				</div>
				<AccountSubNav>
					{accountSubLinks.map(({ name, slug }) => (
						<li key={slug}>
							<Link
								className={slug === router.query.slug ? 'active' : ''}
								href={`/account/${slug}`}>
								{name}
							</Link>
						</li>
					))}
				</AccountSubNav>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
					boxShadow: '0 0 1rem rgba(0,0,0,0.1)',
					padding: '1rem',
				}}>
				<Title>{data.title}</Title>
				{/* <CTALink href="/api/auth/logout">Logout</CTALink>
				<p>You are logeged in as {user.email} </p>
				<p>name: {user.name}</p>
				<img src={user.picture || ''} alt="user gravatar" />
            <hr /> */}

				{slug === 'overview' ? (
					<>
						<h2>Overview</h2>
						<p>Coming soon...</p>
					</>
				) : slug === 'orders' ? (
					<>
						<h2>
							{data.orders.length} order{data.orders.length > 1 ? 's' : ''}
						</h2>
						{data.orders.map(order => (
							<OrderItemCard key={order.id} {...order} />
						))}
					</>
				) : null}
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

const AccountSubNav = styled.ul`
	display: flex;
	flex-direction: column;
	padding: 0rem;
	margin: 0rem;
	li {
		list-style: none;
		display: flex;
		a {
			text-decoration: none;
			color: #000;
			padding: 0.5rem 1rem;
			width: 100%;
			&:hover {
				color: #000;
			}
			&.active {
				border-left: 2px solid var(--oex-orange);
				font-weight: 600;
				color: var(--oex-orange);
				background-color: var(--oex-orange-mute);
			}
		}
	}
`;
