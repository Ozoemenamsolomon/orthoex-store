import ArrowBack from '@assets/new/icons/ArrowBack';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import TrainingOrder from '@components/TrainingOrder';
import { TrainingOrderType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { supabaseTrainingClient } from '@utils/supabase';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { toast } from 'react-toastify';

import { format } from 'url';

const Checkout: NextPage<{
	trainingOrders: TrainingOrderType[];
}> = ({ trainingOrders }) => {
	const { push, pathname, query } = useRouter();
	const deleteTrainingWithId = async (reference: string) => {
		fetch('/api/training-order', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ reference }),
		})
			.then(res => res.json())
			.then(data => {
				toast.success('Training Order deleted');
				push(format({ pathname, query }));
			})
			.catch(err => {
				console.log(err);
				toast.error('Training Order could not be deleted');
			});
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
<<<<<<< HEAD
<<<<<<< HEAD
				<div>
=======
				<OrderWrapper>
>>>>>>> efc9d516a1b0483982531c700c19ea7a663b7c20
=======
				<div>
>>>>>>> 4b087e838ccaa002c15ca81d6f3e5cd1241bca4d
					{trainingOrders.map(training => (
						<TrainingOrder
							key={training.id}
							training={training}
							deleteTraining={deleteTrainingWithId}
						/>
					))}
<<<<<<< HEAD
<<<<<<< HEAD
				</div>
=======
				</OrderWrapper>
>>>>>>> efc9d516a1b0483982531c700c19ea7a663b7c20
=======
				</div>
>>>>>>> 4b087e838ccaa002c15ca81d6f3e5cd1241bca4d
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
const OrderWrapper = styled.div`
	@media ${({ theme }) => theme.breakpoints.above.md} {
		width: 700px;
		margin: 0 auto;
	}
`;
>>>>>>> efc9d516a1b0483982531c700c19ea7a663b7c20
=======
>>>>>>> 4b087e838ccaa002c15ca81d6f3e5cd1241bca4d
