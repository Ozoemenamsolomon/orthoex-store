import { TrainingPromoDataType, TrainingSupbaseDataType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import CTA from './CTA';
import FeaturedEventCard from './FeaturedEventCard';
import { Container } from './styled';
import FeaturedEventsFilter from './FeaturedEventsFilter';
import { useRouter } from 'next/router';

interface FeaturedEventsProp {
	userEmail: string;
	trainingData: TrainingSupbaseDataType[];
	promoData: TrainingPromoDataType[];
}

export type DateType = Date | null;

export interface FilterListType {
	date: DateType[];
	title: string[];
	location: string[];
}

const FeaturedEvents: React.FC<FeaturedEventsProp> = ({
	userEmail,
	trainingData,
	promoData
}) => {
	const [eventCount, setEventCount] = useState(5);
	const [filterList, setFilterList] = useState<FilterListType>({
		date: [null, null],
		title: [],
		location: [],
	});

	const router = useRouter();


	const {location, date, title} = filterList;

	const filteredAndSortedTrainingData = useMemo(() => {

		return trainingData.filter(training => {
			// Apply date filtering logic
			const trainingDate = new Date(training.startDateTime); 
			const startDate = date[0] ? new Date(date[0]) : null;
			const endDate = date[1] ? new Date(date[1]) : null;
			const isDateInRange = (!startDate || trainingDate >= startDate) && (!endDate || trainingDate <= endDate);
	
			// Apply title filtering logic
			const isTitleMatched = title.length === 0 || title.some(t => training.title.includes(t));
	
			// Apply location filtering logic
			const isLocationMatched = location.length === 0 || location.some(l => training.location.includes(l)); 
	
			return isDateInRange && isTitleMatched && isLocationMatched;
		}).sort((a, b) => {
			const dateA = new Date(a.startDateTime);
			const dateB = new Date(b.endDateTime);
			return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
		});
	},[location, trainingData, date, title])

	useEffect(() => {
		const queryParams = new URLSearchParams(
			router.query as Record<string, string>,
		);
		const getParamValues = (paramKey: string) => {
			const titleValues = [] as any;

			for (const [key, value] of Object.entries(router.query)) {
				if (key.startsWith(paramKey)) {
					titleValues.push(value);
				}
			}
			return titleValues;
		};

		const location = getParamValues('location') || [];
		const title = getParamValues('title') || [];
		const dateFromParams = queryParams.get('date')?.split('**');
		const date = dateFromParams ? [new Date(dateFromParams[0]), dateFromParams[1] ? new Date(dateFromParams[1]) : null] : [null, null]
		
		setFilterList(prev => ({
			...prev,
			date,
			title,
			location,
		}));

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const LoadMoreEvent = () => {
		setEventCount(prev => prev + 3);
	};

	return (
		<StyledWrapperDiv>
			<Container id="featured-events">
				<StyledHeading>Featured Events</StyledHeading>
				<FeaturedEventsFilter
					training={trainingData}
					filterList={filterList}
					setFilterList={setFilterList}
				/>
				{filteredAndSortedTrainingData.slice(0, eventCount).map(training => (
					<FeaturedEventCard
						promoData={promoData}
						training={training}
						key={training.id}
						userEmail={userEmail}
					/>
				))}

				{(
					filteredAndSortedTrainingData.length > eventCount) && (
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
