import Breadcrumb from '@components/Breadcrumb';
import ProductCard from '@components/ProductCard';
import SooSection from '@components/SooSection';
import { Container } from '@components/styled';
import product1 from '@assets/new/images/product1.jpg';
import styled from 'styled-components';
import ProductStars from '@components/ProductStars';
import { formatPrice } from 'utils';

const SingleProduct = () => {
	const {
		description,
		name: productName,
		price,
		category: { name: productCategory, slug: productCaegorySlug },
		brand: { name: brandName },
		review: { count: reviewCount, average: reviewAverage },
	} = {
		name: 'Polyester Resin',
		price: 50,
		description:
			'FLAG Resin is a part our Medium-Viscosity 2:1 Non-Blushing Resin. FLAG stands for filling, laminating and gluing. It is compatible with LV Resin and the Slow.',
		category: {
			name: 'Polyester Resin & Components',
			slug: 'Polyester Resin & Components',
		},
		brand: { name: 'OEX' },
		review: { count: 30, average: 3.5 },
	};

	return (
		<Container
			verticalPaddingInREM={7}
			paddingMultiplier={4}
			bg="var(--oex-off-white)"
			style={{ minHeight: '100vh' }}
		>
			<LayoutDiv>
				<Breadcrumb
					breadcrumb={[
						{ name: 'Composites', link: '/composites' },
						{ name: 'All Categories', link: '/composites/categories' },
						{
							name: productCategory,
							link: `/composites/categories/${productCaegorySlug}`,
						},
						{ name: productName, link: '#' },
					]}
				/>
				<SooSection BGColor="white">
					<h3>{productName}</h3>
					<p>
						Brand: <span>{brandName}</span>
					</p>
					<ProductStars stars={reviewAverage} count={reviewCount} />
					<p>{formatPrice(price)}</p>
					<p>{description}</p>
				</SooSection>
				<SooSection BGColor="white">2</SooSection>
				<SooSection BGColor="white">3</SooSection>
				<SooSection BGColor="white">4</SooSection>
				<SooSection
					BGColor="white"
					header={{ title: 'Recently Viewed', align: 'left' }}
				>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
							gap: '2rem',
						}}
					>
						{Array.from({ length: 4 }, () => ({
							image: product1,
							price: 70000,
							name: 'Polyester Resin',
							rating: {
								count: 0,
								stars: 3.5,
							},
						})).map((product, index) => (
							<ProductCard key={`product_${index}`} product={product} />
						))}
					</div>
				</SooSection>
				<SooSection
					BGColor="white"
					header={{ title: 'Popular Products', align: 'left' }}
				>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
							gap: '2rem',
						}}
					>
						{Array.from({ length: 4 }, () => ({
							image: product1,
							price: 70000,
							name: 'Polyester Resin',
							rating: {
								count: 0,
								stars: 3.5,
							},
						})).map((product, index) => (
							<ProductCard key={`product_${index}`} product={product} />
						))}
					</div>
				</SooSection>{' '}
			</LayoutDiv>
		</Container>
	);
};

export default SingleProduct;

const LayoutDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr 320px;
	gap: 2rem;
	align-items: start;

	> *:nth-child(1),
	> *:nth-last-child(2),
	> *:last-child {
		grid-column: span 2;
	}
`;
