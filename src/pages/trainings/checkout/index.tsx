import { Claims, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { supabaseTrainingClient } from '@utils/supabase';
import { NextPage } from 'next';
import styled from 'styled-components';

const Checkout: NextPage<{
	user: Claims;
	trainingOrders: any;
}> = ({ user, trainingOrders }) => {
	return (
		<CheckoutWrapper>
			<h1>Checkout</h1>
			{trainingOrders.length === 0 ? (
				<p>You currently have no orders</p>
			) : (
				<div>
					{trainingOrders.map((training: any) => (
						<p key={training?.id}> {training?.name}</p>
					))}
				</div>
			)}
		</CheckoutWrapper>
	);
};

export default Checkout;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps({ req, res }) {
		const session = await getSession(req, res);
		const user = session?.user.email as string;
		const response = await supabaseTrainingClient
			.from('training_orders')
			.select('*')
			.eq('user', user)
			.eq('paid', false);
		const trainingOrders = response.data || [];

		console.log(user);
		console.log(trainingOrders);

		return {
			props: { trainingOrders },
		};
	},
});

const CheckoutWrapper = styled.div``;
