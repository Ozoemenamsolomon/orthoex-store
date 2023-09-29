import ArrowBack from '@assets/new/icons/ArrowBack';
import { Claims, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import TrainingOrder from '@components/TrainingOrder';
import { deleteTrainingOrder } from '@data/trainingOrderSupabase';
import { TrainingOrderType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { supabaseTrainingClient } from '@utils/supabase';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { format } from 'url';

const Checkout: NextPage<{
	user: Claims;
	trainingOrders: TrainingOrderType[];
}> = ({ user, trainingOrders }) => {
	const { push, pathname, query } = useRouter();
	const deleteTrainingWithId = async (reference: string) => {
		await deleteTrainingOrder(reference, user.email);
		push(format({ pathname, query }));
	};
	return (
		<CheckoutWrapper>
			<div className="back-btn">
				<Link href={'/trainings'}>
					<ArrowBack />
				</Link>
			</div>
			<Heading>Checkout Training</Heading>
			{trainingOrders.length === 0 ? (
				<p className="info-text">You currently have no orders</p>
			) : (
				<div>
					{trainingOrders.map(training => (
						<TrainingOrder
							key={training.id}
							training={training}
							deleteTraining={deleteTrainingWithId}
						/>
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

		return {
			props: { trainingOrders },
		};
	},
});

const CheckoutWrapper = styled.div`
	padding: 0 1rem;
	& .back-btn {
		cursor: pointer;
		font-size: 2rem;
	}
	& .info-text {
		text-align: center;
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
		& .back-btn {
			width: 700px;
			margin: 1rem auto 0;
		}
	}
`;

const Heading = styled.h3`
	margin: 2rem 0;
	text-align: center;
`;
