import CTA from '@components/CTA';
import {
	FormInput,
	FormInputWrapper,
	FormRadioGroup,
	FormRadioLabel,
	FormRadioWrapper,
} from '@components/styled/Forms';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

function Calculator() {
	const [formData, setFormData] = useState({
		shape: '',
		length: '',
		width: '',
		thickness,
	});

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
											type="radio"
											id="shapeRectangle"
											name="shape"
											value="rectangle"
										/>
										Rectangular surface
									</FormRadioLabel>
								</FormRadioGroup>

								<FormRadioGroup>
									<FormRadioLabel>
										<input
											type="radio"
											id="shapeCylinder"
											name="shape"
											value="cylinder"
										/>
										Round surfaces and Cylinders
									</FormRadioLabel>
								</FormRadioGroup>
							</FormRadioWrapper>

							<p>What are the dimensions of your project?</p>
							<FormInputWrapper>
								<FormInput
									type="number"
									id="length"
									name="length"
									value=""
									placeholder="Length"
								/>
								<FormInput
									type="number"
									id="width"
									name="width"
									value=""
									placeholder="Width"
								/>
								<FormInput
									type="number"
									id="thickness"
									name="thickness"
									value=""
									placeholder="Coating Thickness"
								/>
							</FormInputWrapper>

							<StyledCTA type="submit">Calculate</StyledCTA>
						</form>
					</CalculateContent>
					<ResultsContent></ResultsContent>
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

const CalculateContent = styled.div``;
const ResultsContent = styled.div``;

const StyledCTA = styled(CTA)`
	width: 100%;
`;
