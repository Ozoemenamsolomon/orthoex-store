import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { CTALink } from '@components/CTA';
import { Container } from '@components/styled';
import { supabaseClient } from '@utils/supabase';
import { NextPage } from 'next';

type Props = {
	user: UserProfile;
	data: {
		name: string;
		brand: { name: string };
		category: { name: string };
		description: string;
		details: string;
		code: string;
		variant: { [key: string]: string };
		quantity: number;
		price: { priceInKobo: number };
		image: string;
		variantID: string;
	}[];
};

const Account: NextPage<Props> = ({ user, data }) => {
	console.log({ user, data });

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
			{data.map(
				({
					name,
					brand,
					category,
					description,
					details,
					code,
					variant,
					quantity,
					price,
					image,
					variantID,
				}) => (
					<div key={`product_number_${variantID + code}`}>
						<p
							style={{
								padding: '6px',
								borderRadius: '3px',
								border: '1px solid var(--oex-orange-dark)',
								backgroundColor: 'var(--oex-danger)',
								color: 'white',
							}}>
							Your are seeing this because you&apos;ve been added to the test
							user
						</p>
						<h2>{name}</h2>
						<p>Brand: {brand.name}</p>
						<p>Category: {category.name}</p>
						<p>Code: {code}</p>
						<p>Price: {price.priceInKobo}</p>
						<p>Description: {description}</p>
						<p>Details: {details}</p>
						<p>Qty. in stock: {quantity}</p>
						<p>VariantID:{variantID}</p>
						<p>Image: {image}</p>
						<hr />
						{Object.entries(variant).map(([key, value]) => (
							<p key={key}>
								{key}: {value}
							</p>
						))}
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
			.from('variants')
			.select(
				`*, variantID:id, product(code, name, image, description, details, brand(name, slug), category(name, slug, image)), quantity(quantity),price:prices(*)`,
			)
			.eq('prices.custier', custier);

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
				data: data?.map(({ price, product, quantity, variantID, variant }) => ({
					price: price[0],
					variantID,
					variant,
					...quantity,
					...product,
				})),
			},
		};
	},
});
