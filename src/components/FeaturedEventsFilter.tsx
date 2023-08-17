import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import CTA from './CTA';
import 'react-datepicker/dist/react-datepicker.css';

const CheckboxGroup: React.FC<any> = ({
	options,
	selectedOptions,
	onChange,
}) => {
	return (
		<div>
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
		<FilterWrapper>
			<FilterInputs>
				<DatePicker
					selectsRange={true}
					startDate={startDate}
					endDate={endDate}
					onChange={update => {
						setDateRange(update);
					}}
					placeholderText="Select Date"
				/>
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
					}}
				/>
				<CheckboxGroup
					options={titleOptions}
					selectedOptions={selectedTitles}
					onChange={(option: any) => {
						if (selectedTitles.includes(option)) {
							setSelectedTitles(selectedTitles.filter((item: any) => item !== option));
						} else {
							setSelectedTitles([...selectedTitles, option]);
						}
					}}
				/>
			</FilterInputs>
			<CTA className="no-animate filter-btn">Filter</CTA>
		</FilterWrapper>
	);
};

export default FeaturedEventsFilter;

const FilterWrapper = styled.div`
	width: 40rem;
	margin: 2rem auto;
	display: flex;

	& .filter-btn {
		font-size: 1rem;
		padding: 0.8rem 2rem;
	}
`;
const FilterInputs = styled.div`
	min-width: 30rem;
	background-color: white;
`;
