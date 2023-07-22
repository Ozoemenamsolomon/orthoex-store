import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { CTALink } from '@components/CTA';
import TrainingEventCard from '@components/TrainingEventCard';
import { TrainingSupbaseDataType } from '@data/types/trainingTypes';
import { supabaseClient } from '@utils/supabase';
import { NextPage } from 'next';
import styled from 'styled-components';

type Props = { trainings: TrainingSupbaseDataType[] };

const AddTraining: NextPage<Props> = ({ trainings }) => {
	return (
		<WrapperDiv>
			<HeadingSection>
				<HeadingText>Training Events</HeadingText>
				<CTALink className="no-animate" href={''}>
					Add Training
				</CTALink>
			</HeadingSection>

			<TrainingTable>
				<TableHeader>
					<div>Title</div>
					<div>Start Date</div>
					<div>End Date</div>
					<div>Format</div>
					<div>Price</div>
					<div></div>
				</TableHeader>
				<TableBody>
					{trainings.map(training => (
						<TrainingEventCard key={training.id} training={training} />
					))}
				</TableBody>
			</TrainingTable>
		</WrapperDiv>
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

const WrapperDiv = styled.div`
	padding: 2rem;
	background-color: var(--oex-light-grey);

	@media ${({ theme }) => theme.breakpoints.above.md} {
	}
`;

const HeadingSection = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	& > a > button {
		padding: 5px 10px;
		font-size: 15px;
		border: 1px solid var(--oex-orange);

		:hover {
			background-color: white;
			color: var(--oex-orange);
		}
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
	}
`;

const HeadingText = styled.h2`
	margin: 1.5rem 0;

	@media ${({ theme }) => theme.breakpoints.above.md} {
	}
`;

const TrainingTable = styled.div`
	border: 1px solid var(--oex-lighter-grey);
	border-radius: 5px;
	@media ${({ theme }) => theme.breakpoints.above.md} {
	}
`;

const TableHeader = styled.div`
	display: grid;
	grid-template-columns: 2fr repeat(5, 1fr);
	overflow-wrap: anywhere;
	align-items: center;
	gap: 2px;
	padding: 10px 5px;
	font-weight: bold;
	background-color: var(--oex-lighter-grey);

	& > :first-child {
		padding-left: 4px;
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
	}
`;

const TableBody = styled.div`
	@media ${({ theme }) => theme.breakpoints.above.md} {
	}
`;
