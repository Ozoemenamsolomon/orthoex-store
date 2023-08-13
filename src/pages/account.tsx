import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { CTALink } from '@components/CTA';
import OrderItemCard from '@components/OrderItemCard';
import { Container } from '@components/styled';
import { supabaseClient } from '@utils/supabase';
import { NextPage } from 'next';

type Props = {
	user: UserProfile;
	orders: any[];
};

const Account: NextPage<Props> = ({ user, orders }) => {
	return (
		<Container>
			<h1>Account</h1>
			<CTALink href="/api/auth/logout">Logout</CTALink>
			<p>You are logeged in as {user.email} </p>
			<p>name: {user.name}</p>
			<img src={user.picture || ''} alt="user gravatar" />
			<hr />
			<h2>
				{orders.length} order{orders.length > 1 ? 's' : ''}
			</h2>

			{orders.map(order => (
				<OrderItemCard {...order} />
			))}
		</Container>
	);
};

export default Account;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const session = await getSession(ctx.req, ctx.res);

		if (
			!process.env.ALLOWED_USER_EMAIL?.split(',').includes(session?.user.email)
		) {
			return {
				props: {
					orders: [],
				},
			};
		}

		const { data, error } = await supabaseClient
			.from('orders')
			.select('id, created_at, totalPrice, cart, reference, paid, expiresAt')
			.eq('user', session?.user.email)
			.order('created_at', { ascending: false });

		if (error) {
			console.log({ error });
			return {
				props: {
					orders: [],
				},
			};
		}

		return {
			props: {
				orders: data,
			},
		};
	},
});
