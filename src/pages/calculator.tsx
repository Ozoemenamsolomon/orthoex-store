import FinalAmount from '@components/calculator/FinalAmount';
import CTA from '@components/CTA';
import {
	FormInput,
	FormInputWrapper,
	FormRadioGroup,
	FormRadioLabel,
	FormRadioWrapper,
	FormSelect,
} from '@components/styled/Forms';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

type OnChangeType =
	| React.ChangeEvent<HTMLInputElement>
	| React.ChangeEvent<HTMLSelectElement>;

type FormDataType = {
	shape: 'cylinder' | 'rectangle';
	diameter: string;
	length: string;
	width: string;
	thickness: string;
	unit: string;
};

const dataOne = {
	productType: 'OEX5302',
	ratio: 2,
	partA: 40,
	partB: 10,
};
const dataTwo = {
	productType: 'OEX5311',
	ratio: 1,
	partA: 30,
	partB: 30,
};

function Calculator() {
	const [formData, setFormData] = useState<FormDataType>({
		shape: 'cylinder',
		diameter: '',
		length: '',
		width: '',
		thickness: '',
		unit: '',
	});

	const { shape, length, width, thickness, diameter, unit } = formData;

	const onInputChange = (e: OnChangeType) => {
		setFormData(prev => {
			return { ...prev, [e.target.id]: e.target.value };
		});
	};

	return (
		<>
			<PageHeading>
				<BackButtonWrapper>
					<Link href="/composites">Back</Link>
				</BackButtonWrapper>
				<PageHeadingWrapper>
					<span>Calculator</span>
				</PageHeadingWrapper>
			</PageHeading>
			<PageWrapper>
				<PageContainer>
					<CalculateContent>
						<h4>Epoxy Resin Calculator</h4>
						<p>
							Leave out the guesswork. Use our epoxy resin to estimate the
							amount of resin you would need for your project!
						</p>
						<form action="">
							<p>What is the shape of your project?</p>
							<FormRadioWrapper>
								<FormRadioGroup>
									<FormRadioLabel>
										<input
											checked
											type="radio"
											id="shape"
											name="shape"
											value="rectangle"
											onChange={onInputChange}
										/>
										Rectangular surface
									</FormRadioLabel>
								</FormRadioGroup>

								<FormRadioGroup>
									<FormRadioLabel>
										<input
											type="radio"
											id="shape"
											name="shape"
											value="cylinder"
											onChange={onInputChange}
										/>
										Round surfaces and Cylinders
									</FormRadioLabel>
								</FormRadioGroup>
							</FormRadioWrapper>

							<p>What are the dimensions of your project?</p>
							<FormInputWrapper>
								{shape === 'rectangle' ? (
									<>
										<FormInput
											min="0"
											type="number"
											id="length"
											name="length"
											value={length}
											placeholder="Length"
											onChange={onInputChange}
										/>
										<FormInput
											type="number"
											id="width"
											name="width"
											value={width}
											placeholder="Width"
											onChange={onInputChange}
										/>
									</>
								) : (
									<FormInput
										type="number"
										id="diameter"
										name="diameter"
										value={diameter}
										placeholder="Diameter"
										onChange={onInputChange}
									/>
								)}

								<FormInput
									type="number"
									id="thickness"
									name="thickness"
									value={thickness}
									placeholder="Coating Thickness"
									onChange={onInputChange}
								/>
							</FormInputWrapper>

							<FormSelect
								onChange={onInputChange}
								name="unit"
								id="unit"
								defaultValue={'default'}
								placeholder="Choose your unit">
								<option disabled value="default">
									Choose your unit
								</option>
								<option value="CM">Centimeter (CM)</option>
								<option value="M">Meter (M)</option>
								<option value="In">Inches (In)</option>
								<option value="Ft">Feet (Ft)</option>
							</FormSelect>

							<StyledCTA className="no-animate" type="submit">
								Calculate
							</StyledCTA>
						</form>
					</CalculateContent>
					<ResultsContent>
						<h3>Preview Final Amount</h3>
						<p>Here is the amount of resin you will need for your project.</p>
						<FinalAmount data={dataOne} />
						<FinalAmount data={dataTwo} />
					</ResultsContent>
				</PageContainer>
			</PageWrapper>
		</>
	);
}

export default Calculator;

const PageWrapper = styled.div`
	background-color: var(--oex-lightest-grey);
	// background-color: red;
	margin-top: 5rem;
	padding-top: 7rem;
`;

const PageHeading = styled.div`
	display: flex;
	// align-items: center;
	// justify-content: center;
	position: fixed;
	top: 6rem;
	z-index: 2;
	background-color: white;
	width: 100%;
	min-height: 3rem;
	border-bottom: 1px solid var(--oex-lightest-grey);
`;

const BackButtonWrapper = styled.div`
	border-right: 1px solid var(--oex-dark-grey);
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 1rem;
`;

const PageHeadingWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding-left: 4rem;
`;

const PageContainer = styled.div`
	background-color: white;
	min-height: 50vh;
	padding: 1rem;
	// margin-top: 11rem;

	@media (min-width: 768px) {
		// flex-direction: row;
	}

	@media (min-width: 2000px) {
		// padding: 3rem 25rem 5rem;
	}
`;

const CalculateContent = styled.div`
	margin-bottom: 3rem;
`;

const ResultsContent = styled.div`
	border: 1px solid var(--text-colour-light-grey);
	padding: 1rem;
	border-radius: 0.5rem;

	& > h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 400;
	}

	& > p {
		color: var(--text-colour-grey);
		margin: 1rem 0;
	}
`;

const StyledCTA = styled(CTA)`
	width: 100%;

	// &:hover {
	// 	transform: scale(0.95);
	// }
`;
