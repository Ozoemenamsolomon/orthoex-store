import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import CTA, { CTALink } from '@components/CTA';
import { priceFormatter } from '@components/ProductCard';
import { Container } from '@components/styled';
import { supabaseClient } from '@utils/supabase';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Key } from 'react';

type Props = {
	user: UserProfile;
	orders: any[];
};

const Account: NextPage<Props> = ({ user, orders }) => {
	const router = useRouter();
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
			{/* <pre>{JSON.stringify(orders, null, 2)}</pre> */}
			<h2>
				{orders.length} order{orders.length > 1 ? 's' : ''}
			</h2>

			{orders.map(order => (
				<div
					style={{
						border: '1px solid #ccc',
						margin: '1rem 0',
						padding: '1rem',
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					{order.cart.map((item: { id: Key | null | undefined }) => (
						<span>
							<pre key={item.id}>{JSON.stringify(item, null, 1)}</pre>
						</span>
					))}
					<div style={{ display: 'flex', alignItems: 'center' }}>
						{!order.paid && (
							<CTA
								onClick={() => {
									router.push(`/composites/checkout/${order.reference}`);
								}}>
								Pay {priceFormatter.format(order.totalPrice)}
							</CTA>
						)}
					</div>
				</div>
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
			.select('*')
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
