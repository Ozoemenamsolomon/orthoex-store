import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { CTALink } from '@components/CTA';
import { Container } from '@components/styled';
import { NextPage } from 'next';

type Props = {
	user: UserProfile;
};

const Account: NextPage<Props> = ({ user }) => {
	console.log({ user });

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
			return { props: {} };
		}

		return {
			props: {},
		};
	},
});
