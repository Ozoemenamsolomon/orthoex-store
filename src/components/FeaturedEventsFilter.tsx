import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import CTA from './CTA';
import 'react-datepicker/dist/react-datepicker.css';
import CancelIcon from '@assets/new/icons/CancelIcon';

const CheckboxGroup: React.FC<any> = ({
	options,
	selectedOptions,
	onChange,
	title,
}) => {
	return (
		<CheckBoxGroupWrapper>
			<span>{title}</span>
			<div className="options">
				{options.map((option: any) => (
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

type DateType = Date | null;

const FeaturedEventsFilter: React.FC = () => {
	const [dateRange, setDateRange] = useState<DateType[]>([null, null]);
	const [startDate, endDate] = dateRange;
	const [selectedCategories, setSelectedCategories] = useState<any>([]);
	const [selectedTitles, setSelectedTitles] = useState<any>([]);

	const categoryOptions = ['Category 1', 'Category 2', 'Category 3'];
	const titleOptions = ['Title 1', 'Title 2', 'Title 3'];
	return (
		<FEWrapper>
			<FilterWrapper>
				<FilterInputs>
					<DatePickerWrapper>
						<span>Date Range:</span>
						<DatePicker
							className="date-picker"
							selectsRange={true}
							startDate={startDate}
							endDate={endDate}
							onChange={update => {
								setDateRange(update);
							}}
							placeholderText="Select Date"
							isClearable={true}
						/>
					</DatePickerWrapper>
					<CheckBoxWrapper>
						<CheckboxGroup
							title="Category"
							options={categoryOptions}
							selectedOptions={selectedCategories}
							onChange={(option: any) => {
								if (selectedCategories.includes(option)) {
									setSelectedCategories(
										selectedCategories.filter((item: any) => item !== option),
									);
								} else {
									setSelectedCategories([...selectedCategories, option]);
								}
							}}
						/>
						<CheckboxGroup
							title="Title"
							options={titleOptions}
							selectedOptions={selectedTitles}
							onChange={(option: any) => {
								if (selectedTitles.includes(option)) {
									setSelectedTitles(
										selectedTitles.filter((item: any) => item !== option),
									);
								} else {
									setSelectedTitles([...selectedTitles, option]);
								}
							}}
						/>
					</CheckBoxWrapper>
				</FilterInputs>
				<CTA className="no-animate filter-btn">Filter</CTA>
			</FilterWrapper>
			{/* TODO: Chnage below component to reusable */}
			<SelectedFiltersWrapper>
				{dateRange.every(item => item !== null) && (
					<SelectedFilter>
						<span className="selected-text">Date</span>
						<span className="icon" onClick={() => setDateRange([null, null])}>
							<CancelIcon />
						</span>
					</SelectedFilter>
				)}
				{selectedCategories.length > 0 && (
					<SelectedFilter>
						<span className="selected-text">Category</span>
						<span className="icon" onClick={() => setSelectedCategories([])}>
							<CancelIcon />
						</span>
					</SelectedFilter>
				)}
				{selectedTitles.length > 0 && (
					<SelectedFilter>
						<span className="selected-text">Title</span>
						<span className="icon" onClick={() => setSelectedTitles([])}>
							<CancelIcon />
						</span>
					</SelectedFilter>
				)}
			</SelectedFiltersWrapper>
		</FEWrapper>
	);
};

export default FeaturedEventsFilter;

const FEWrapper = styled.div`
	margin-bottom: 1rem;
`;

const SelectedFiltersWrapper = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 1rem;
`;

const SelectedFilter = styled.span`
	display: inline-flex;
	align-items: center;
	background-color: var(--oex-orange-mute);
	border-radius: 9px;
	padding: 2px 8px;

	& .icon {
		cursor: pointer;
	}
	& .selected-text {
		font-size: 1.2rem;
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
	}
`;

const FilterWrapper = styled.div`
	& .filter-btn {
		font-size: 0.8rem;
		padding: 0.5rem 1rem;
		margin-top: 0.7rem;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		min-width: 80%;
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

	& .options {
		display: none;
		position: absolute;
		background-color: var(--oex-off-white);
		z-index: 1;
		padding: 12px 0px;

		& label {
			display: inline-block;
			margin-bottom: 5px;
			width: 100%;
			padding: 5px 3px;
			cursor: pointer;

			&:hover {
				background-color: var(--oex-orange-mute);
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

	&:hover .options {
		display: block;
	}
`;

const DatePickerWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;

	& .date-picker {
		outline-color: var(--oex-orange);
		padding: 0.5rem 0.4rem;
		width: 180px;
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
`;

const CheckBoxWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	min-height: 50px;
`;
