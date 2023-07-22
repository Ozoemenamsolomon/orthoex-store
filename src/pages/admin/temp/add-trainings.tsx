import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { TrainingSupbaseDataType } from '@data/types/trainingTypes';
import { supabaseClient } from '@utils/supabase';
import { NextPage } from 'next';

type Props = { trainings: TrainingSupbaseDataType[] };

const AddTraining: NextPage<Props> = ({ trainings }) => {
	return (
		<div>
			<h2>Training Data</h2>
			<div>
				{trainings.map(training => (
					<p key={training.id}>{training.title}</p>
				))}
			</div>
		</div>
	);
};

export default AddTraining;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const session = await getSession(ctx.req, ctx.res);
		//TODO: Add try catch block for the api call
		const trainingFromSupabase = await supabaseClient
			.from('training')
			.select('*');

		const trainingFromSupaBaseTransformed =
			trainingFromSupabase.data as unknown as TrainingSupbaseDataType;

		return {
			props: {
				user: session?.user,
				trainings: trainingFromSupaBaseTransformed || [],
			},
		};
	},
});
