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
	shape: string;
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
		shape: '',
		diameter: '',
		length: '',
		width: '',
		thickness: '',
		unit: '',
	});

	const { shape, length, width, thickness, diameter, unit } = formData;
	console.log(shape && shape);

	const onInputChange = (e: OnChangeType) => {
		console.log(e.target.value);
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
					<CalculatorWrapper>
						<CalculateContent>
							<h3>Epoxy Calculator</h3>
							<p>
								Leave out the guesswork. Use our epoxy resin to estimate the
								amount of resin you would need for your project!
							</p>
							<form action="">
								<ParagraphText>
									What is the shape of your project?
								</ParagraphText>
								<FormRadioWrapper>
									<FormRadioGroup>
										<FormRadioLabel>
											<input
												checked
												type="radio"
												id="shape"
												name="shape"
												value="rectangle"
												onChange={e => console.log(e.target.value)}
												// onChange={onInputChange}
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
												// onChange={onInputChange}
												onChange={e => console.log(e.target.value)}
											/>
											Round surfaces and Cylinders
										</FormRadioLabel>
									</FormRadioGroup>
								</FormRadioWrapper>

								<ParagraphText>
									What are the dimensions of your project?
								</ParagraphText>
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
					</CalculatorWrapper>
				</PageContainer>

				<PageContainer>
					<ResinProducts>Make</ResinProducts>
				</PageContainer>
			</PageWrapper>
		</>
	);
}

export default Calculator;

const PageWrapper = styled.div`
	background-color: var(--oex-lightest-grey);
	margin-top: 5rem;
	padding-top: 7rem;

	@media (min-width: 768px) {
		padding: 7rem;
	}
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

	@media (min-width: 768px) {
		display: none;
	}
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
	max-width: 1100px;
	margin: auto;
`;

const CalculatorWrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
	padding: 1rem;

	@media (min-width: 768px) {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 5rem;
		margin: 0rem auto;
		padding: 1rem 2rem;
	}
`;

const ParagraphText = styled.p`
	@media (min-width: 768px) {
		font-size: 1.2rem;
		margin-bottom: 2rem;
	}
`;

const CalculateContent = styled.div`
	margin-bottom: 3rem;

	& > h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 400;
		margin-bottom: 1rem;
	}

	& > p {
		margin: 2rem 0rem;
		color: var(--text-colour-grey);
	}

	@media (min-width: 768px) {
		width: 42%;

		& > h3 {
			font-size: 1.7rem;
			font-weight: 700;
		}
	}
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

	@media (min-width: 768px) {
		width: 42%;

		& > h3 {
			font-size: 1.7rem;
			font-weight: 700;
		}
	}
`;

const StyledCTA = styled(CTA)`
	width: 100%;
`;

const ResinProducts = styled.div`
	height: 20vh;
	background: white;
	padding: 1rem;
	margin-top: 3rem;

	@media (min-width: 768px) {
		margin: 5rem auto 0rem;
	}
`;
