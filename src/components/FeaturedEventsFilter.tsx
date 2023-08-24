import React, { SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import CTA from './CTA';
import 'react-datepicker/dist/react-datepicker.css';
import CancelIcon from '@assets/new/icons/CancelIcon';
import Location from '@assets/new/icons/Location';
import Calender from '@assets/new/icons/Calender';
import { FilterListType } from './FeaturedEvents';

const CheckboxGroup: React.FC<any> = ({
	options,
	selectedOptions,
	onChange,
	children,
}) => {
	return (
		<CheckBoxGroupWrapper>
			<div className="checkbox-title">{children}</div>
			<div className="options">
				{options.map((option: string) => (
					<label key={option}>
						<input
							type="checkbox"
							value={option}
							checked={selectedOptions.includes(option)}
							onChange={() => onChange(option)}
						/>
						{option}
					</label>
				))}
			</div>
		</CheckBoxGroupWrapper>
	);
};

interface FeaturedEventsFilter {
	filterList: FilterListType;
	setFilterList: React.Dispatch<SetStateAction<FilterListType>>;
	onFilterClick: ()=> void
}

const FeaturedEventsFilter: React.FC<FeaturedEventsFilter> = ({
	filterList,
	setFilterList,
	onFilterClick
}) => {

	const categoryOptions = ['Location 1', 'Location 2', 'Location 3'];
	const titleOptions = ['Title 1', 'Title 2', 'Title 3'];

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
								className="date-picker"
								selectsRange={true}
								startDate={filterList.date[0]}
								endDate={filterList.date[1]}
								inline
								onChange={update => {
									setFilterList(prev => ({ ...prev, date: update }));
								}}
								placeholderText="Select Date"
								isClearable={true}
							/>
						</div>
					</DatePickerWrapper>
					<CheckBoxWrapper>
						<CheckboxGroup
							options={categoryOptions}
							selectedOptions={filterList.location}
							onChange={(option: string) => {
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
							options={titleOptions}
							selectedOptions={filterList.title}
							onChange={(option: string) => {
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
				<CTA
					className="no-animate filter-btn"
					onClick={onFilterClick}>
					Filter
				</CTA>
			</FilterWrapper>

			<FilterTilesWrapper>
				{filterList.date.every(item => item !== null) && (
					<FilterTiles>
						<span className="selected-text">Date</span>
						<span
							className="icon"
							onClick={() =>
								setFilterList(prev => ({ ...prev, date: [null, null] }))
							}>
							<CancelIcon />
						</span>
					</FilterTiles>
				)}
				{filterList.location.length > 0 && (
					<FilterTiles>
						<span className="selected-text">Location</span>
						<span
							className="icon"
							onClick={() =>
								setFilterList(prev => {
									return { ...prev, location: [] };
								})
							}>
							<CancelIcon />
						</span>
					</FilterTiles>
				)}
				{filterList.title.length > 0 && (
					<FilterTiles>
						<span className="selected-text">Title</span>
						<span
							className="icon"
							onClick={() =>
								setFilterList(prev => {
									return { ...prev, title: [] };
								})
							}>
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
		padding: 12px 0px;
		box-shadow: 2px 0px 16px rgba(207, 207, 207, 0.1),
			-2px 0px 4px rgba(207, 207, 207, 0.1),
			0px 2px 12px rgba(207, 207, 207, 0.1),
			0px -2px 16px rgba(207, 207, 207, 0.1);

		& label {
			display: inline-block;
			margin-bottom: 5px;
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
