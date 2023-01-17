import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { CTALink } from '@components/CTA';
import { Container } from '@components/styled';
import { supabaseClient } from '@utils/supabase';
import { NextPage } from 'next';

type Props = { user: UserProfile; data: any };

const Account: NextPage<Props> = ({ user, data }) => {
	console.log({ user, data });

	return !user ? (
		<div>please login</div>
	) : (
		<Container>
			<h1>Account</h1>
			<CTALink href="/api/auth/logout">Logout</CTALink>
			<p>You are logeged in with {user.email} </p>
			<p>name: {user.name}</p>
			<img src={user.picture || ''} alt="user gravatar" />
			<hr />
			{data.map(
				({
					name,
					code,
					variants,
					description,
					brand,
					category,
					details,
				}: any) => (
					<div key={code}>
						<p
							style={{
								padding: '6px',
								borderRadius: '3px',
								border: '1px solid var(--oex-orange-dark)',
								backgroundColor: 'var(--oex-danger)',
								color: 'white',
							}}>
							Your are seeing this because you've been added to the test user
						</p>
						<h2>{name}</h2>
						<p>Brand: {brand.name}</p>
						<p>Category: {category.name}</p>
						<p>Description: {description}</p>
						<p>Details: {details}</p>
						<p>Code: {code}</p>
						<hr />
						<div>
							<h5>Variations</h5>
							<ol
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fit,minmax(144px,1fr))',
									gap: '1rem 2rem',
								}}>
								{variants?.map(({ variant, quantity, prices, id }: any) => (
									<li key={'variant' + id}>
										<p>Variant id: {id}</p>
										{Object.entries(variant).map(([key, value]) => (
											<p key={key}>
												{key}: {value}
											</p>
										))}
										<p>Qty. in stock: {quantity?.quantity}</p>
										<p>Price: {prices[0]?.priceInKobo}</p>
									</li>
								))}
							</ol>
						</div>
						<hr />
					</div>
				),
			)}
		</Container>
	);
};

export default Account;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const session = await getSession(ctx.req, ctx.res);

		const custier = session?.user.custier;

		if (
			!process.env.ALLOWED_USER_EMAIL?.split(',').includes(session?.user.email)
		) {
			return { props: { data: [] } };
		}

		// @ts-ignore
		const { data, error } = await supabaseClient
			.from('products')
			.select(
				`code, name, image, description, brand(name, slug), category(name, slug, image), details,variants(variant, id, prices(custier, priceInKobo),quantity(quantity))`,
			)
			.eq('variants.prices.custier', custier)
			.like('code', 'PRO-%');

		if (error) {
			console.log({ error });
			return {
				props: {
					data: [],
				},
			};
		}

		return {
			props: {
				data,
			},
		};
	},
});
