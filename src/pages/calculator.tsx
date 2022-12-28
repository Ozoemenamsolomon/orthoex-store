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
import {
	calculateCylinderResinInKg,
	calculateRectangularResinInKg,
} from 'utils/calculator';

export enum PRODUCTTYPE {
	OEX5302 = 'OEX5302',
	OEX5311 = 'OEX5311',
}
export enum SHAPETYPE {
	RECTANGLE = 'RECTANGLE',
	CYLINDER = 'CYLINDER',
}

export enum UNITSTYPE {
	CENTIMETRE = 'CM',
	METRE = 'M',
	INCHES = 'IN',
	FEET = 'FT',
}

type OnChangeType =
	| React.ChangeEvent<HTMLInputElement>
	| React.ChangeEvent<HTMLSelectElement>;

type FormDataType = {
	shape: SHAPETYPE;
	diameter: number;
	length: number;
	width: number;
	thickness: number;
	unit: string;
};

function Calculator() {
	const [formData, setFormData] = useState<FormDataType>({
		shape: SHAPETYPE.RECTANGLE,
		diameter: 0,
		length: 0,
		width: 0,
		thickness: 0,
		unit: '',
	});

	const [productOne, setProductOne] = useState({
		partA: 0,
		partB: 0,
	});

	const [productTwo, setProductTwo] = useState(0);

	const { shape, length, width, thickness, diameter, unit } = formData;

	// const calculateDisabled = Object.values(formData).includes(0 || '');

	const onInputChange = (e: OnChangeType) => {
		setFormData(prev => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const onCalculate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formData.shape === SHAPETYPE.RECTANGLE) {
			const resinInKg = calculateRectangularResinInKg(
				length,
				width,
				thickness,
				unit,
			);
			const partA = (2 / 3) * resinInKg;
			const partB = (1 / 3) * resinInKg;
			setProductOne({
				partA,
				partB,
			});
			setProductTwo(resinInKg / 2);
		} else if (formData.shape === SHAPETYPE.CYLINDER) {
			const resinInKg = calculateCylinderResinInKg(diameter, thickness, unit);
			const partA = (2 / 3) * resinInKg;
			const partB = (1 / 3) * resinInKg;
			setProductOne({
				partA,
				partB,
			});
			setProductTwo(resinInKg / 2);
		}
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
							<form action="" onSubmit={onCalculate}>
								<ParagraphText>
									What is the shape of your project?
								</ParagraphText>
								<FormRadioWrapper>
									<FormRadioGroup>
										<FormRadioLabel>
											<input
												type="radio"
												id="shapeCylinder"
												name="shape"
												value={SHAPETYPE.RECTANGLE}
												onChange={onInputChange}
											/>
											Rectangular surface
										</FormRadioLabel>
									</FormRadioGroup>

									<FormRadioGroup>
										<FormRadioLabel>
											<input
												type="radio"
												id="shapeRectangle"
												name="shape"
												value={SHAPETYPE.CYLINDER}
												onChange={onInputChange}
											/>
											Round surfaces and Cylinders
										</FormRadioLabel>
									</FormRadioGroup>
								</FormRadioWrapper>

								<ParagraphText>
									What are the dimensions of your project?
								</ParagraphText>
								<FormInputWrapper>
									{shape === SHAPETYPE.RECTANGLE ? (
										<>
											<FormInput
												type="number"
												id="length"
												name="length"
												value={length || ''}
												placeholder="Length"
												onChange={onInputChange}
											/>
											<FormInput
												type="number"
												id="width"
												name="width"
												value={width || ''}
												placeholder="Width"
												onChange={onInputChange}
											/>
										</>
									) : (
										<FormInput
											type="number"
											id="diameter"
											name="diameter"
											value={diameter || ''}
											placeholder="Diameter"
											onChange={onInputChange}
										/>
									)}

									<FormInput
										type="number"
										id="thickness"
										name="thickness"
										value={thickness || ''}
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
									<option value={UNITSTYPE.CENTIMETRE}>Centimetre (CM)</option>
									<option value={UNITSTYPE.METRE}>Metre (M)</option>
									<option value={UNITSTYPE.INCHES}>Inches (In)</option>
									<option value={UNITSTYPE.FEET}>Feet (Ft)</option>
								</FormSelect>

								<StyledCTA
									// disabled={calculateDisabled}
									className="no-animate"
									type="submit">
									Calculate
								</StyledCTA>
							</form>
						</CalculateContent>
						<ResultsContent>
							<h3>Preview Final Amount</h3>
							<p>Here is the amount of resin you will need for your project.</p>
							<FinalAmount
								productType={PRODUCTTYPE.OEX5302}
								partA={productOne.partA}
								partB={productOne.partB}
							/>
							<hr />
							<FinalAmount
								productType={PRODUCTTYPE.OEX5311}
								partA={productTwo}
								partB={productTwo}
							/>
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
	// margin-top: 5rem;
	padding-top: 4rem;

	@media (${({ theme }) => theme.breakpoints.above.md}) {
		padding: 4rem;
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

	@media (${({ theme }) => theme.breakpoints.above.md}) {
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

	@media (${({ theme }) => theme.breakpoints.above.md}) {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 5rem;
		margin: 0rem auto;
		padding: 1rem 2rem;
		border-radius: 0.5rem;
	}
`;

const ParagraphText = styled.p`
	@media (${({ theme }) => theme.breakpoints.above.md}) {
		font-size: 1.2rem;
		margin-bottom: 2rem;
	}
`;

const CalculateContent = styled.div`
	margin-bottom: 3rem;

	& > h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: null0;
		margin-bottom: 1rem;
	}

	& > p {
		margin: 2rem 0rem;
		color: var(--text-colour-grey);
	}

	@media (${({ theme }) => theme.breakpoints.above.md}) {
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

	@media (${({ theme }) => theme.breakpoints.above.md}) {
		width: 42%;

		& > h3 {
			font-size: 1.7rem;
			font-weight: 700;
		}
	}
`;

const StyledCTA = styled(CTA)<{ disabled?: boolean }>`
	width: 100%;
	background-color: ${({ disabled }) => disabled && 'var(--oex-light-orange)'};
	pointer-events: ${({ disabled }) => disabled && 'none'};
`;

const ResinProducts = styled.div`
	height: 20vh;
	background: white;
	padding: 1rem;
	margin-top: 3rem;

	@media (${({ theme }) => theme.breakpoints.above.md}) {
		margin: 5rem auto 0rem;
	}
`;
