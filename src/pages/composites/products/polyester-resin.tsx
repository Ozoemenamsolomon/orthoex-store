import creditCard from '@assets/new/icons/credit-card-black.svg';
import DataSheet from '@assets/new/icons/DataSheet';
import deliveryVan from '@assets/new/icons/delivery-van-black.svg';
import headphone from '@assets/new/icons/headphone-black.svg';
import nigeriaMap from '@assets/new/icons/nigeria.svg';
import bankTransferlogo from '@assets/new/images/bank-transfer-logo.jpg';
import mastercardLogo from '@assets/new/images/mastercard-logo.jpg';
import visaLogo from '@assets/new/images/visa-logo.jpg';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import Breadcrumb from '@components/Breadcrumb';
import CTA, { CTALink } from '@components/CTA';
import CustomerReviewCommentCard from '@components/CustomerReviewCommentCard';
import { SocialsContainer } from '@components/Footer';
import ProductCard from '@components/ProductCard';
import ProductStars from '@components/ProductStars';
import { helps } from '@components/sections/NeedHelpSection';
import ServiceCard, { ServiceCardType } from '@components/ServiceCard';
import SooSection from '@components/SooSection';
import StarPercentage from '@components/StarPercentage';
import { Container, ProductCards } from '@components/styled';
import { ProductDataType, productsData } from '@data/productsData';
import { Facebook, Instagram, Twitter } from '@styled-icons/bootstrap';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styled from 'styled-components';
import { formatPrice, getPrice } from 'utils';

const orderBenefits: ServiceCardType[] = [
	{
		title: 'Order by 12PM',
		description: 'Shipped same day',
		image: deliveryVan,
	},
	{
		title: 'Safe payment',
		description: 'Trusted SSL protection',
		image: creditCard,
	},
	{
		title: 'Technical Advice',
		description: 'We offer helpful tips & tricks to aid your craft',
		image: headphone,
	},
	{
		title: 'Nationwide delivery',
		description: 'We deliver to all cities in Nigeria',
		image: nigeriaMap,
	},
];

const SingleProduct: NextPage<{ product: ProductDataType }> = ({ product }) => {
	const {
		description,
		name: productName,
		variants,
		image,
		previewImages,
		category: { name: productCategory, slug: productCategorySlug },
		brand: { name: brandName },
		review,
		details: productDetail,
	} = product;

	const { user } = useUser();

	const price = getPrice(variants, (user?.custier || 'visitor') as string);

	const customerReviews = Array.from({ length: 2 }, (_, index) =>
		index === 0
			? {
					reviewer: 'Abdur-rasheed Idris',
					date: '08-10-2022',
					comment:
						'Adipiscing posuere sem non, feugiat sit sapien aliquam, faucibus posuere. Suscipit ',
					star: 5,
			  }
			: {
					reviewer: 'Solomon Ezra',
					date: '09-20-2022',
					comment:
						'Non ac vel a enim, libero. Nulla auctor senectus amet nulla. Tellus nulla sit risus.',
					star: 2,
			  },
	);

	const [productCount, setProductCount] = useState(0);

	return (
		<Container
			verticalPaddingInREM={2}
			paddingMultiplier={4}
			bg="var(--oex-off-white)"
			style={{ minHeight: '100vh' }}>
			<LayoutDiv>
				<Breadcrumb
					breadcrumb={[
						{ name: 'Composites', link: '/composites' },
						{ name: 'All Categories', link: '/composites/categories' },
						{
							name: productCategory,
							link: `/composites/categories/${productCategorySlug}`,
						},
						{ name: productName, link: '#' },
					]}
				/>
				<SooSection BGColor="white">
					<ProductData>
						<div
							style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
							<div
								style={{
									display: 'flex',
									gap: '2px',
									flexDirection: 'column',
									alignItems: 'center',
								}}>
								<div
									style={{
										width: '281px',
										aspectRatio: '0.9',
										position: 'relative',
									}}>
									<Image
										alt="product image"
										src={image}
										object-fit="contain"
										fill
									/>
								</div>
								<div style={{ display: 'flex', gap: '5px' }}>
									{previewImages?.map((imagei, index) => (
										<div
											key={`image-preview-${index}`}
											style={{
												position: 'relative',
												aspectRatio: '1',
												width: '70px',
											}}>
											<Image
												object-fit="contain"
												fill
												src={imagei}
												alt="product image preview"></Image>
										</div>
									))}
								</div>
							</div>
							<ShareandDataSheets />
						</div>
						<div
							style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
							<div>
								<h3>{productName}</h3>
								<p>
									Brand:{' '}
									<span style={{ color: 'var(--oex-orange)' }}>
										{brandName}
									</span>
								</p>

								{review && (
									<ProductStars average={review.average} count={review.count} />
								)}
								<Price>{formatPrice(price)}</Price>
								<p style={{ color: '#575757' }}> {description}</p>
								<ShareProduct forSmall />
							</div>
							<div>
								<Title>Safe and secure payment </Title>
								<div style={{ display: 'flex', gap: '5px' }}>
									<div>
										<Image
											alt="payment processor logo"
											src={mastercardLogo}></Image>
									</div>
									<div>
										<Image alt="payment processor logo" src={visaLogo}></Image>
									</div>
									<div>
										<Image
											alt="payment processor logo"
											src={bankTransferlogo}></Image>
									</div>
								</div>
							</div>
							<div style={{ display: 'flex', gap: '1rem' }}>
								<select
									style={{
										padding: '1rem',
										fontSize: '1rem',
										flex: '1',
										border: '1px solid var(--oex-light-grey)',
										borderRadius: '4px',
									}}
									name="size"
									id="size">
									<option value="Select Size" selected disabled>
										Select Size
									</option>
									<option value="small">Small</option>
									<option value="medium">Medium</option>
									<option value="large">Large</option>
								</select>
								<div
									style={{
										display: 'flex',
										gap: '.5rem',
										alignItems: 'center',
									}}>
									<ProductCountControlButton
										onClick={() => {
											setProductCount(prevProductCount => prevProductCount - 1);
										}}>
										-
									</ProductCountControlButton>
									<ProductCountInput
										type="number"
										name="quantity"
										id="quantity"
										value={productCount}
										onChange={e => setProductCount(Number(e.target.value))}
									/>
									<ProductCountControlButton
										onClick={() =>
											setProductCount(prevProductCount => prevProductCount + 1)
										}>
										+
									</ProductCountControlButton>
								</div>
							</div>
							<div
								style={{
									display: 'grid',
									gap: '2rem',
									gridTemplateColumns: '1fr 1fr',
								}}>
								<CTA>Add to cart</CTA>
								<CTA>Buy now</CTA>
							</div>
						</div>
					</ProductData>
				</SooSection>
				<SooSection BGColor="white">
					<Title>Delivery</Title>
					<p>Delivery is charged based on your location at checkout</p>
					<Title>Our Advantages</Title>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: '2rem 0.5rem',
							border: '1px solid #F3F3F3',
							borderRadius: '6px',
							padding: '1rem',
						}}>
						{orderBenefits.map((benefit, index) => (
							<ServiceCard
								small
								className="no-shadow no-padding"
								key={`e-comerce-${index}`}
								service={benefit}
							/>
						))}
					</div>
				</SooSection>
				<SooSection BGColor="white">
					<TabsContainer>
						<Tabs>
							<TabList>
								<Tab>
									<TabTitle>
										<DataSheet />
										Product details
									</TabTitle>
								</Tab>
								<Tab>
									<TabTitle>
										<DataSheet />
										Resin Calculator
									</TabTitle>
								</Tab>
								<Tab>
									<TabTitle>
										<DataSheet />
										Product Feedbacks
									</TabTitle>
								</Tab>
							</TabList>

							<TabPanel>
								{productDetail && (
									<ReactMarkdown>{productDetail}</ReactMarkdown>
								)}
							</TabPanel>
							<TabPanel>
								<h2>Epoxy calculator</h2>
								<p>
									Leave out the guesswork. Use our epoxy resin to estimate the
									amount of resin you will need for your projects!
								</p>
								<p>What can you do with our calculator?</p>
								<ul>
									<li>Check rectangular surface</li>
									<li>Check Round or cylinder surface</li>
									<li>Check the Model of resin</li>
									<li>Preview the amount resin needed.</li>
								</ul>
								<CTA>View Calculator</CTA>
							</TabPanel>
							<TabPanel>
								<h2>Customer Review</h2>
								<ProductStars average={0} count={0} />
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '.5rem',
										maxWidth: '300px',
									}}>
									{Array.from({ length: 5 }, () => ({
										starsPercent: Math.random() * 100,
									})).map(({ starsPercent }, index) => (
										<button
											key={`star-percentage-${index}`}
											style={{
												font: 'inherit',
												border: '0',
												backgroundColor: 'transparent',
												cursor: 'pointer',
											}}>
											<StarPercentage
												star={5 - index}
												percent={starsPercent}></StarPercentage>
										</button>
									))}
								</div>
								<div
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr ))',
										gap: '1rem',
									}}>
									{customerReviews.map((comment, index) => (
										<CustomerReviewCommentCard
											key={`customer-review-${index}`}
											{...comment}
										/>
									))}
								</div>
							</TabPanel>
						</Tabs>
					</TabsContainer>
				</SooSection>
				<SooSection BGColor="white">
					<Title>Do you need help?</Title>
					<div style={{ display: 'grid', gap: '2rem' }}>
						{helps.map((help, index) => (
							<ServiceCard
								small
								key={'helps_' + index}
								className="no-shadow no-padding"
								service={help}
							/>
						))}
					</div>
				</SooSection>
				<SooSection
					BGColor="white"
					header={{ title: 'Recently Viewed', align: 'left' }}>
					<ProductCards>
						{Array.from({ length: 4 }, () => productsData[0]).map(
							(product, index) => (
								<ProductCard key={`product_${index}`} product={product} />
							),
						)}
					</ProductCards>
				</SooSection>
				<SooSection
					BGColor="white"
					header={{ title: 'Popular Products', align: 'left' }}>
					<ProductCards>
						{Array.from({ length: 4 }, () => productsData[2]).map(
							(product, index) => (
								<ProductCard key={`product_${index}`} product={product} />
							),
						)}
					</ProductCards>
				</SooSection>
			</LayoutDiv>
		</Container>
	);
};

export default SingleProduct;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(context) {
		return {
			props: { product: productsData[0] },
		};
	},
});

const ShareandDataSheets = () => (
	<ShareandDataSheetsContainer>
		<ShareProduct />
		<div>
			<Title>
				<DataSheet colour="#707070" />
				DATA SHEET
			</Title>

			<DataSheetLink>Product Data Sheet</DataSheetLink>
			<DataSheetLink>Safety Data Sheet</DataSheetLink>
		</div>
	</ShareandDataSheetsContainer>
);

const ShareProduct = ({ forSmall = false }) => {
	const router = useRouter();

	const { asPath } = router;

	const shareOnTwitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		'Check out this product',
	)}&url=${encodeURIComponent(asPath)}`;

	const shareOnFacebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
		asPath,
	)}`;

	const shareOnInstagramLink = `https://www.instagram.com/?url=${encodeURIComponent(
		asPath,
	)}`;

	return (
		<ShareProductContainer forSmall={forSmall}>
			<Title>Share this product</Title>
			<SocialsContainer>
				<CTALink isSocial href={shareOnTwitterLink}>
					<Twitter width={18} />
				</CTALink>
				<CTALink isSocial href={shareOnFacebookLink}>
					<Facebook width={18} />
				</CTALink>
				<CTALink isSocial href={shareOnInstagramLink}>
					<Instagram width={18} />
				</CTALink>
			</SocialsContainer>
		</ShareProductContainer>
	);
};

const ShareProductContainer = styled.div<{ forSmall: boolean }>`
	@media ${({ theme }) => theme.breakpoints.above.sm} {
		display: ${({ forSmall }) => forSmall && 'none'};
	}
`;

const ShareandDataSheetsContainer = styled.div`
	display: none;
	gap: 1rem;
	flex-direction: column;
	@media ${({ theme }) => theme.breakpoints.above.sm} {
		display: flex;
	}
`;

const DataSheetLink = styled.p`
	color: var(--oex-orange);
`;

// TODO: get rid of export
export const ProductCountControlButton = styled.button`
	height: 2.5rem;
	aspect-ratio: 1;
	border-radius: 50%;
	border: none;
	font-size: 2rem;
	background: var(--oex-light-grey);
	color: #a0a0a0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Price = styled.p`
	font-weight: 600;
	font-size: 32px;
	margin-block: 1rem;
`;

const Title = styled.h2`
	margin: 0;
	font-weight: 600;
	font-size: 1.2rem;
	border-bottom: 1px solid var(--oex-light-grey);
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
	display: flex;
`;
const TabsContainer = styled.span`
	.react-tabs__tab-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
		border-color: var(--oex-grey);
		padding-bottom: 0.5rem;
	}
	.react-tabs__tab {
		outline: none;
	}
	.react-tabs__tab {
		bottom: 0;
		border: none;
		color: var(--oex-grey);
	}
	.react-tabs__tab--selected {
		color: var(--oex-orange);
	}
`;
const TabTitle = styled(Title)`
	margin: 0;
	padding-bottom: 0;
	border-bottom: none;
`;

const LayoutDiv = styled.div`
	display: grid;
	gap: 2rem;
	align-items: start;
	& > section {
		margin-top: 0;
	}

	@media ${({ theme }) => theme.breakpoints.above.xl} {
		grid-template-columns: 2.5fr 1fr;
		> *:nth-child(1),
		> *:nth-last-child(2),
		> *:last-child {
			grid-column: span 2;
		}
	}
`;

const ProductData = styled.div`
	@media ${({ theme }) => theme.breakpoints.above.md} {
		display: flex;
		gap: 1rem;
	}
`;

export const ProductCountInput = styled.input`
	padding-block: 1rem;
	font-size: 1rem;
	width: 5ch;
	border: none;
	text-align: center;

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	&[type='number'] {
		-moz-appearance: textfield;
	}
`;
