import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import CTA, { CTALink } from '@components/CTA';
import { priceFormatter } from '@components/ProductCard';
import { Container } from '@components/styled';
import { supabaseClient } from '@utils/supabase';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

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
			<p>You are logeged in as {user.email} </p>
			<p>name: {user.name}</p>
			<img src={user.picture || ''} alt="user gravatar" />
			<hr />
			<textarea name="" id=""></textarea>
			<hr />
			<h2>
				{orders.length} order{orders.length > 1 ? 's' : ''}
			</h2>

			{orders.map(order => (
				<div
					key={order.id}
					style={{
						border: '1px solid #ccc',
						margin: '1rem 0',
						padding: '1rem',
						display: 'flex',
						flexDirection: 'column',
					}}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							backgroundColor: 'var(--oex-orange-mute)',
							marginTop: '-1rem',
							marginInline: '-1rem',
							padding: '1rem',
							paddingBottom: 0,
						}}>
						<p>Order placed on {order.created_at}</p>
						<p>
							Totalling {priceFormatter.format(order.totalPrice)} for{' '}
							{order.cart.length} item{order.cart.length > 1 ? 's' : ''}
						</p>
						<p>
							Order reference: <strong>{order.reference}</strong>
						</p>
					</div>
					<div>
						{order.cart.map(
							(item: {
								id: number;
								quantity: number;
								name: string;
								price: number;
								variant: any;
							}) => (
								<div
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(4,1fr)',
										gap: '1rem',
										padding: '1rem',
										borderBottom: '1px solid #ccc',
									}}
									key={item.id}>
									<span>
										{item.quantity} x {item.name}
									</span>

									<span>{priceFormatter.format(item.price)}</span>
									<span>
										{priceFormatter.format(item.price * item.quantity)}
									</span>

									{JSON.stringify(item.variant, null, 1)}
								</div>
							),
						)}
					</div>
					{!order.paid && (
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<CTA
								onClick={() => {
									router.push(`/composites/checkout/${order.reference}`);
								}}>
								Pay {priceFormatter.format(order.totalPrice)}
							</CTA>
							<p>
								Order expires by{' '}
								{new Date(order.expiresAt).toLocaleTimeString()} on{' '}
								{new Date(order.expiresAt).toLocaleDateString()}
							</p>
						</div>
					)}
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
