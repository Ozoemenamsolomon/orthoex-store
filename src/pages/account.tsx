import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { CTALink } from '@components/CTA';
import { Container } from '@components/styled';
import { supabaseClient } from '@utils/supabase';
import { NextPage } from 'next';

type Props = {
	user: UserProfile;
	orders: any[];
};

const Account: NextPage<Props> = ({ user, orders }) => {
	console.log({ user: user });

	return (
		<Container>
			<h1>Account</h1>
			<CTALink href="/api/auth/logout">Logout</CTALink>
			<p>You are logeged in with {user.email} </p>
			<p>name: {user.name}</p>
			<img src={user.picture || ''} alt="user gravatar" />
			<hr />
			<textarea name="" id=""></textarea>
			<hr />
			<pre>{JSON.stringify(orders, null, 2)}</pre>
		</Container>
	);
};

export default Account;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const session = await getSession(ctx.req, ctx.res);

		const custier = session?.user.custier;

		console.log({ custier });
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
			.select('*')
			.eq('user', session?.user.email)
			.order('created_at', { ascending: false });

		console.log({ data, error });

		return {
			props: {
				orders: data,
			},
		};
	},
});
