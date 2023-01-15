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
		</Container>
	);
};

export default Account;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const session = await getSession(ctx.req, ctx.res);

		const custier = session?.user.custier;

		console.log({ custier });

		// @ts-ignore
		const { data, error } = await supabaseClient
			.from('products')
			.select(
				`code, name, image, description, brand(name, slug), category(name, slug, image), details,variants(weightInGram, hardness, volumeInML, colour, gms, material, prices(custier, priceInKobo),quantity(quantity))`,
			);
		// .eq('prices.variant.custier', custier);

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
