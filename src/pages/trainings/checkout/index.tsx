import { Claims, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import TrainingOrder from '@components/TrainingOrder';
import { TrainingOrderType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { supabaseTrainingClient } from '@utils/supabase';
import { NextPage } from 'next';
import styled from 'styled-components';

const Checkout: NextPage<{
	user: Claims;
	trainingOrders: TrainingOrderType[];
}> = ({ user, trainingOrders }) => {
	return (
			<CheckoutWrapper>
				<Heading>Checkout Training</Heading>
				{trainingOrders.length === 0 ? (
					<p>You currently have no orders</p>
				) : (
					<div>
						{trainingOrders.map(training => (
							<TrainingOrder key={training.id} training={training} />
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
		const trainingOrders =
			(response.data as unknown as TrainingOrderType[]) || [];

		console.log(user);
		console.log(response.data);

		return {
			props: { trainingOrders },
		};
	},
});

const CheckoutWrapper = styled.div`
  padding: 0 1rem;
`;

const Heading = styled.h3`
	margin: 2rem 0;
	text-align: center;
`;
