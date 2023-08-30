import Calender from '@assets/new/icons/Calender';
import CancelIcon from '@assets/new/icons/CancelIcon';
import Location from '@assets/new/icons/Location';
import { TrainingSupbaseDataType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { useRouter } from 'next/router';
import React, { ReactNode, SetStateAction, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { DateType, FilterListType } from './FeaturedEvents';

type InputEventType = React.ChangeEvent<HTMLInputElement>;

type CheckboxGroupType = {
	options: string[],
	selectedOptions: string[],
	inputName: string,
	onChange: (option: string, event: any) => void,
	children: ReactNode
}

const CheckboxGroup: React.FC<CheckboxGroupType> = ({
	options,
	selectedOptions,
	onChange,
	children,
	inputName,
}) => {
	return (
		<CheckBoxGroupWrapper>
			<div className="checkbox-title">{children}</div>
			<div className="options">
				{options.map((option: string, idx) => (
					<label key={option}>
						<input
							name={`${inputName}-${idx+1}`}
							type="checkbox"
							value={option}
							checked={selectedOptions.includes(option)}
							onChange={event => onChange(option, event)}
						/>
						<span>{option}</span>
					</label>
				))}
			</div>
		</CheckBoxGroupWrapper>
	);
};

function getUniqueValuesByKey<T>(data: T[], key: keyof T): Array<T[keyof T]> {
	const uniqueValuesSet = new Set<T[keyof T]>();

	data.forEach(item => {
		uniqueValuesSet.add(item[key]);
	});

	return Array.from(uniqueValuesSet);
}

interface FeaturedEventsFilter {
	filterList: FilterListType;
	setFilterList: React.Dispatch<SetStateAction<FilterListType>>;
	training: TrainingSupbaseDataType[];
}

const FeaturedEventsFilter: React.FC<FeaturedEventsFilter> = ({
	filterList,
	setFilterList,
	training,
}) => {
	const locationOptions = getUniqueValuesByKey<TrainingSupbaseDataType>(
		training,
		'location',
	) as string[];
	const titleOptions = getUniqueValuesByKey<TrainingSupbaseDataType>(
		training,
		'title',
	) as string[];


	const router = useRouter();

	const handleQueryParamsOnChange = useCallback(
		(name: string, value: string) => {
			const queryParams = new URLSearchParams(
				router.query as Record<string, string>,
			);
			if (queryParams.get(name)) {
				queryParams.delete(name);
			} else {
				queryParams.set(name, value);
			}
			router.push({pathname: router.pathname, query: queryParams.toString()},undefined,{ scroll: false });
		},
		[router],
	);

	const deleteParams = useCallback((name: string) => {
		const queryParams = new URLSearchParams(
			router.query as Record<string, string>,
		);
		for (const [key] of Object.entries(router.query)) {
			if (key.startsWith(name)) {
				queryParams.delete(key);
			}
		}
		router.push({pathname: router.pathname, query: queryParams.toString() }, undefined, {scroll: false});
	}, [router])

	const addDateParams = useCallback((selectedDate: DateType[]) => {
		const queryParams = new URLSearchParams(
			router.query as Record<string, string>,
		);
		const selectedDateString = selectedDate.join('**')

		if (selectedDate.some(d => d !== null)) {
			queryParams.delete('date');
			queryParams.set('date', selectedDateString);
		}

		router.push({pathname: router.pathname, query: queryParams.toString() }, undefined, {scroll: false});
	}, [router])

	return (
		<FEWrapper>
			<FilterWrapper>
				<FilterInputs>
					<DatePickerWrapper>
						<div className="date-title">
							<Calender />
							<span>Date</span>
						</div>
						<div className="date-picker-wrapper">
							<DatePicker
								name="date"
								className="date-picker"
								selectsRange={true}
								startDate={filterList.date[0]}
								endDate={filterList.date[1]}
								inline
								onChange={(update) => {
									addDateParams(update)
									setFilterList(prev => ({ ...prev, date: update }));
								}}
								placeholderText="Select Date"
								isClearable={true}
							/>
						</div>
					</DatePickerWrapper>
					<CheckBoxWrapper>
						<CheckboxGroup
							inputName={'location'}
							options={locationOptions}
							selectedOptions={filterList.location}
							onChange={(option: string, e: InputEventType) => {
								// update the route
								handleQueryParamsOnChange(e.target.name, e.target.value);
								
								// update filter state
								if (filterList.location.includes(option)) {
									setFilterList(prev => {
										const filteredLocation = filterList.location.filter(
											item => item !== option,
										);
										return { ...prev, location: filteredLocation };
									});
								} else {
									setFilterList(prev => {
										const filteredLocation = [...filterList.location, option];
										return { ...prev, location: filteredLocation };
									});
								}
							}}>
							<DivSection>
								<Location />
								<span>Location</span>
							</DivSection>
						</CheckboxGroup>
						<CheckboxGroup
							inputName={'title'}
							options={titleOptions}
							selectedOptions={filterList.title}
							onChange={(option: string, e: InputEventType) => {
								handleQueryParamsOnChange(e.target.name, e.target.value);

								if (filterList.title.includes(option)) {
									setFilterList(prev => {
										const filteredTitle = filterList.title.filter(
											item => item !== option,
										);
										return { ...prev, title: filteredTitle };
									});
								} else {
									setFilterList(prev => {
										const filteredTitle = [...filterList.title, option];
										return { ...prev, title: filteredTitle };
									});
								}
							}}>
							<DivSection>
								<Location />
								<span>Title</span>
							</DivSection>
						</CheckboxGroup>
					</CheckBoxWrapper>
				</FilterInputs>
			</FilterWrapper>

			<FilterTilesWrapper>
				{filterList.date.some(item => item !== null) && (
					<FilterTiles>
						<span className="selected-text">Date</span>
						<span
							className="icon"
							onClick={() => {
								deleteParams('date');
								setFilterList(prev => ({ ...prev, date: [null, null] }))
							}}>
							<CancelIcon />
						</span>
					</FilterTiles>
				)}
				{filterList.location.length > 0 && (
					<FilterTiles>
						<span className="selected-text">Location</span>
						<span
							className="icon"
							onClick={() => {
								deleteParams('location');
								setFilterList(prev => {
									return { ...prev, location: [] };
								})
							}}>
							<CancelIcon />
						</span>
					</FilterTiles>
				)}
				{filterList.title.length > 0 && (
					<FilterTiles>
						<span className="selected-text">Title</span>
						<span
							className="icon"
							onClick={() => {
								deleteParams('title')
								setFilterList(prev => {
									return { ...prev, title: [] };
								})
							}}>
							<CancelIcon />
						</span>
					</FilterTiles>
				)}
			</FilterTilesWrapper>
		</FEWrapper>
	);
};

export default FeaturedEventsFilter;

const FEWrapper = styled.div`
	margin-bottom: 1rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 2rem;
	}
`;

const FilterTilesWrapper = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 1rem;
`;

const FilterTiles = styled.span`
	display: inline-flex;
	align-items: center;
	background-color: #ffe8da;
	border-radius: 9px;
	padding: 2px 8px;

	& .icon {
		cursor: pointer;
	}
	& .selected-text {
		font-size: 1.2rem;
	}
`;

const FilterWrapper = styled.div`
	& .filter-btn {
		font-size: 1rem;
		padding: 0.6rem 1.2rem;
		margin-top: 0.7rem;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		margin: 1rem 0;
		display: flex;

		& .filter-btn {
			font-size: 1rem;
			padding: 0.8rem 2rem;
			margin-top: 0rem;
		}
	}
`;
const FilterInputs = styled.div`
	background-color: white;
	display: flex;
	flex-direction: column;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		gap: 1rem;
		flex-direction: row;
	}
`;

const CheckBoxGroupWrapper = styled.div`
	position: relative;
	display: inline-block;
	width: 200px;
	cursor: pointer;

	&:hover .checkbox-title {
		color: var(--oex-orange);
	}

	&:hover .options {
		display: block;
	}

	& .options {
		display: none;
		position: absolute;
		background-color: var(--oex-off-white);
		z-index: 1;
		min-width: 100%;
		box-shadow: 2px 0px 16px rgba(207, 207, 207, 0.1),
			-2px 0px 4px rgba(207, 207, 207, 0.1),
			0px 2px 12px rgba(207, 207, 207, 0.1),
			0px -2px 16px rgba(207, 207, 207, 0.1);

		& label {
			display: flex;
			gap: 3px;
			align-items: flex-start;
			width: 100%;
			padding: 5px 3px;
			cursor: pointer;

			&:hover {
				background-color: #ffe8da;
			}
		}

		& input:checked {
			color: var(--oex-orange);
			background-color: var(--oex-orange);
		}

		& input[type='checkbox']:checked {
			background-color: var(--oex-orange);
		}
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		border-left: 1px solid var(--text-colour-grey);
	}
`;

const DivSection = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	justify-content: center;
	color: var(--text-colour-grey);
	text-align: center;

	&:hover {
		color: var(--oex-orange);
	}
`;

const DatePickerWrapper = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	color: var(--text-colour-grey);
	min-height: 50px;
	justify-content: center;
	min-width: 140px;

	& .date-title {
		display: flex;
		gap: 10px;
		align-items: center;
		justify-center: center;
	}
	& .date-picker-wrapper {
		position: absolute;
		z-index: 2;
		display: none;
		margin-top: 2.5rem;
	}

	& .date-picker {
		outline-color: var(--oex-orange);
		padding: 0.5rem 0.4rem;
		width: 180px;
	}

	&:hover .date-picker-wrapper {
		display: block;
	}

	&:hover {
		color: var(--oex-orange);
	}

	& .react-datepicker__close-icon:: after {
		background-color: var(--oex-orange);
	}

	& .react-datepicker__day--keyboard-selected,
	.react-datepicker__month-text--keyboard-selected,
	.react-datepicker__quarter-text--keyboard-selected,
	.react-datepicker__year-text--keyboard-selected {
		background-color: #f5a97a;
	}

	& .react-datepicker__day--selected,
	.react-datepicker__day--in-selecting-range,
	.react-datepicker__day--in-range,
	.react-datepicker__month-text--selected,
	.react-datepicker__month-text--in-selecting-range,
	.react-datepicker__month-text--in-range,
	.react-datepicker__quarter-text--selected,
	.react-datepicker__quarter-text--in-selecting-range,
	.react-datepicker__quarter-text--in-range,
	.react-datepicker__year-text--selected,
	.react-datepicker__year-text--in-selecting-range,
	.react-datepicker__year-text--in-range {
		background-color: #f5a97a;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		justify-content: left;

		& .date-title {
			padding-left: 20px;
		}
	}
`;

const CheckBoxWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	min-height: 50px;
`;
