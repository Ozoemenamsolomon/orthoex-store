import Breadcrumb from '@components/Breadcrumb';
import ProductCard from '@components/ProductCard';
import SooSection from '@components/SooSection';
import { Container } from '@components/styled';
import product1 from '@assets/new/images/product1.jpg';
import styled from 'styled-components';

const SingleProduct = () => {
	const { productCaegory, productName, productCaegorySlug } = {
		productCaegory: 'Polyester Resin & Components',
		productCaegorySlug: 'Polyester Resin & Components',
		productName: 'Polyester Resin',
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
							name: productCaegory,
							link: `/composites/categories/${productCaegorySlug}`,
						},
						{ name: productName, link: '#' },
					]}
				/>
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
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
