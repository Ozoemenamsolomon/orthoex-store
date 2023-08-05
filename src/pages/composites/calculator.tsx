import ArrowBack from '@assets/new/icons/ArrowBack';
import FinalAmount, { PRODUCTTYPE } from '@components/calculator/FinalAmount';
import CTA from '@components/CTA';
import ProductCard from '@components/ProductCard';
import { ProductCards } from '@components/styled';
import {
	FormInput,
	FormInputWrapper,
	FormRadioGroup,
	FormRadioLabel,
	FormRadioWrapper,
	FormSelect,
} from '@components/styled/Forms';
import { getRelatedProducts, ProductVariantType } from '@data/index';
import { singleDBProductToProductMapper } from '@data/productsData';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {
	calculateCylinderResinInKg,
	calculateRectangularResinInKg,
	SHAPETYPE,
	UNITSTYPE,
} from 'utils/calculator';

type OnChangeType =
	| React.ChangeEvent<HTMLInputElement>
	| React.ChangeEvent<HTMLSelectElement>;

type FormDataType = {
	shape: SHAPETYPE;
	diameter: number;
	length: number;
	width: number;
	thickness: number;
	unit: UNITSTYPE;
};

const Calculator: NextPage<{ selectedProducts: ProductVariantType[] }> = ({
	selectedProducts,
}) => {
	const transformedProducts = selectedProducts.map(product =>
		singleDBProductToProductMapper(product),
	);
	const [formData, setFormData] = useState<FormDataType>({
		shape: SHAPETYPE.RECTANGLE,
		diameter: 0,
		length: 0,
		width: 0,
		thickness: 0,
		unit: UNITSTYPE.CENTIMETRE,
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
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};

	const onRadioButtonChange = (e: OnChangeType) => {
		if (e.target.value === SHAPETYPE.RECTANGLE) {
			setFormData(prev => {
				return { ...prev, diameter: 0, shape: SHAPETYPE.RECTANGLE };
			});
		} else {
			setFormData(prev => {
				return { ...prev, length: 0, width: 0, shape: SHAPETYPE.CYLINDER };
			});
		}
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
			if (resinInKg < 1) {
				toast.error('Measurments less than 1Kg, enter different values');
			}
			const partA = (2 / 3) * resinInKg;
			const partB = (1 / 3) * resinInKg;
			setProductOne({
				partA,
				partB,
			});
			setProductTwo(resinInKg / 2);
		} else if (formData.shape === SHAPETYPE.CYLINDER) {
			const resinInKg = calculateCylinderResinInKg(diameter, thickness, unit);
			if (resinInKg < 1) {
				toast.error('Measurments less than 1Kg, enter different values');
			}
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
					<Link href="/composites">
						<ArrowBack />
					</Link>
				</BackButtonWrapper>
				<PageHeadingWrapper>
					<span>Calculator</span>
				</PageHeadingWrapper>
			</PageHeading>
			<PageWrapper>
				<PageContainer>
					<CalculatorWrapper>
						<CalculateContent>
							<h3>Epoxy Resin Calculator</h3>
							<p>
								Leave out the guesswork. Use our epoxy resin calculator to
								estimate the amount of resin you would need for your project!
							</p>
							<form action="" onSubmit={onCalculate}>
								<ParagraphText>
									What is the shape of your project?
								</ParagraphText>
								<FormRadioWrapper>
									<FormRadioGroup>
										<FormRadioLabel>
											<input
												checked={shape === SHAPETYPE.RECTANGLE}
												type="radio"
												id="shapeRectangle"
												name="shape"
												value={SHAPETYPE.RECTANGLE}
												onChange={onRadioButtonChange}
											/>
											Rectangular surface
										</FormRadioLabel>
									</FormRadioGroup>

									<FormRadioGroup>
										<FormRadioLabel>
											<input
												checked={shape === SHAPETYPE.CYLINDER}
												type="radio"
												id="shapeCylinder"
												name="shape"
												value={SHAPETYPE.CYLINDER}
												onChange={onRadioButtonChange}
											/>
											Round surfaces and Cylinders
										</FormRadioLabel>
									</FormRadioGroup>
								</FormRadioWrapper>

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

								<ParagraphText>
									What are the dimensions of your project?
								</ParagraphText>
								<FormInputWrapper>
									{shape === SHAPETYPE.RECTANGLE ? (
										<>
											<FormInput
												min={0}
												type="number"
												id="length"
												name="length"
												value={length || ''}
												placeholder="Length"
												onChange={onInputChange}
												required={shape === SHAPETYPE.RECTANGLE}
											/>
											<FormInput
												min={0}
												type="number"
												id="width"
												name="width"
												value={width || ''}
												placeholder="Width"
												onChange={onInputChange}
												required={shape === SHAPETYPE.RECTANGLE}
											/>
										</>
									) : (
										<FormInput
											min={0}
											type="number"
											id="diameter"
											name="diameter"
											value={diameter || ''}
											placeholder="Diameter"
											onChange={onInputChange}
											required={shape === SHAPETYPE.CYLINDER}
										/>
									)}

									<FormInput
										min={0}
										type="number"
										id="thickness"
										name="thickness"
										value={thickness || ''}
										placeholder="Coating Thickness/Height"
										onChange={onInputChange}
										required={true}
									/>
								</FormInputWrapper>

								<StyledCTA className="no-animate" type="submit">
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
					<ResinProducts>
						<ResinProductTitle>Selected Products</ResinProductTitle>
						<ProductCards>
							{transformedProducts.map((product, index) => (
								<ProductCard key={`product_${index}`} {...product} />
							))}
						</ProductCards>
					</ResinProducts>
				</PageContainer>
			</PageWrapper>
		</>
	);
};

export default Calculator;

export const getStaticProps: GetStaticProps = async () => {
	const selectedProductCode = 'PRO-08001';

	const selectedProducts = await getRelatedProducts(selectedProductCode);
	return {
		props: {
			selectedProducts,
		},
	};
};

const PageWrapper = styled.div`
	background-color: var(--oex-off-white);
	// margin-top: 5rem;
	padding-top: 4rem;

	@media (${({ theme }) => theme.breakpoints.above.md}) {
		padding: 3rem;
	}
`;

const PageHeading = styled.div`
	display: flex;
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
	background: var(--oex-off-white);

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
	background: white;
	padding: 2rem;
	margin-top: 3rem;

	@media (${({ theme }) => theme.breakpoints.above.md}) {
		// margin: 5rem auto 0rem;
		border-radius: 0.5rem;
	}
`;

const ResinProductTitle = styled.h4`
	font-size: 1.2rem;
	margin: 0;

	@media (${({ theme }) => theme.breakpoints.above.md}) {
		font-size: 2rem;
	}
`;
