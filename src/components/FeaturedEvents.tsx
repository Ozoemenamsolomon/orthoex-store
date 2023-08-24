import { TrainingSupbaseDataType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import CTA from './CTA';
import FeaturedEventCard from './FeaturedEventCard';
import { Container } from './styled';
import FeaturedEventsFilter from './FeaturedEventsFilter';

interface FeaturedEventsProp {
	userEmail: string;
	trainingData: TrainingSupbaseDataType[];
}

type DateType = Date | null;

export interface FilterListType {
	date: DateType[];
	title: string[];
	location: string[];
}

const FeaturedEvents: React.FC<FeaturedEventsProp> = ({
	userEmail,
	trainingData,
}) => {
	const [eventCount, setEventCount] = useState(2);
	const [filterList, setFilterList] = useState<FilterListType>({
		date: [null, null],
		title: [],
		location: [],
	});

	const searchParams = useSearchParams();
	const router = useRouter();

	const handleFilterClick = () => {
		 router.push({
			pathname: router.pathname,
			query: {
				...router.query,
				title: filterList.title.join('**'),
				location: filterList.location.join('**'),
			},
		});
	};

	useEffect(() => {
		const location = searchParams.get('location')?.split('**') || [];
		const title = searchParams.get('title')?.split('**') || [];
		
		setFilterList(prev => ({
			...prev,
			title: title.length > 0 ? title : [],
			location: location.length > 0 ? location : [],
		}));
	}, [searchParams]);

	const LoadMoreEvent = () => {
		setEventCount(prev => prev + 1);
	};

	return (
		<StyledWrapperDiv>
			<Container id="featured-events">
				<StyledHeading>Featured Events</StyledHeading>
				<FeaturedEventsFilter
					filterList={filterList}
					setFilterList={setFilterList}
					onFilterClick={handleFilterClick}
				/>
				{trainingData.slice(0, eventCount).map(training => (
					<FeaturedEventCard
						training={training}
						key={training.id}
						userEmail={userEmail}
					/>
				))}

				{trainingData.length !== eventCount && (
					<StyledLoadMore>
						<CTA className="btn-width" onClick={LoadMoreEvent} white>
							Load more events
						</CTA>
					</StyledLoadMore>
				)}
			</Container>
		</StyledWrapperDiv>
	);
};

export default FeaturedEvents;

const StyledWrapperDiv = styled.div`
	background-color: var(--oex-off-white);
	padding: 3rem 0rem 0rem;
`;

export const StyledHeading = styled.h3<{ align?: string; padding?: boolean }>`
	text-align: ${({ align }) => (align ? align : 'center')};
	padding: ${({ padding }) => (padding ? '0rem 1rem' : '0rem')};
	font-size: 2rem;
	margin-bottom: 2rem;
	font-weight: 500;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 0rem;
		text-align: center;
		font-weight: 700;
		font-size: 3rem;
		max-width: 70%;
		margin: 5rem auto;
	}
`;

const StyledLoadMore = styled.div`
	text-align: center;
	margin: 3rem 0;

	& .btn-width {
		display: block;
		margin: 3rem auto;
	}
`;
