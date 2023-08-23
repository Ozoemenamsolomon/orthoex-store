import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import CTA from './CTA';
import 'react-datepicker/dist/react-datepicker.css';
import CancelIcon from '@assets/new/icons/CancelIcon';
import Location from '@assets/new/icons/Location';
import Calender from '@assets/new/icons/Calender';

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
						<div className="date-title">
							<Calender />
							<span>Date</span>
						</div>
						<div className="date-picker-wrapper">
							<DatePicker
								className="date-picker"
								selectsRange={true}
								startDate={startDate}
								endDate={endDate}
								inline
								onChange={update => {
									setDateRange(update);
								}}
								placeholderText="Select Date"
								isClearable={true}
							/>
						</div>
					</DatePickerWrapper>
					<CheckBoxWrapper>
						<CheckboxGroup
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
							}}>
							<DivSection>
								<Location />
								<span>Location</span>
							</DivSection>
						</CheckboxGroup>
						<CheckboxGroup
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
							}}>
							<DivSection>
								<Location />
								<span>Title</span>
							</DivSection>
						</CheckboxGroup>
					</CheckBoxWrapper>
				</FilterInputs>
				<CTA className="no-animate filter-btn">Filter</CTA>
			</FilterWrapper>

			<FilterTilesWrapper>
				{dateRange.every(item => item !== null) && (
					<FilterTiles>
						<span className="selected-text">Date</span>
						<span className="icon" onClick={() => setDateRange([null, null])}>
							<CancelIcon />
						</span>
					</FilterTiles>
				)}
				{selectedCategories.length > 0 && (
					<FilterTiles>
						<span className="selected-text">Category</span>
						<span className="icon" onClick={() => setSelectedCategories([])}>
							<CancelIcon />
						</span>
					</FilterTiles>
				)}
				{selectedTitles.length > 0 && (
					<FilterTiles>
						<span className="selected-text">Title</span>
						<span className="icon" onClick={() => setSelectedTitles([])}>
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
	background-color: var(--oex-orange-mute);
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
