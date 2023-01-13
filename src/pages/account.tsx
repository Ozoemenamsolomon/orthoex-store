import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import { CTALink } from '@components/CTA';
import { Container } from '@components/styled';

type Props = {};

const Account = (props: Props) => {
	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

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

export const getServerSideProps = withPageAuthRequired();
