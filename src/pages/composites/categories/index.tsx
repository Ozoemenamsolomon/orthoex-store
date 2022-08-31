import Categories from '@components/Categories';
import ProductCard from '@components/ProductCard';
import StayTunedSection from '@components/sections/StayTunedSection';
import SooSection from '@components/SooSection';
import { Container } from '@components/styled';
import product1 from '@assets/new/images/product1.jpg';
import { categories } from '@data/categories';

const composite = () => {
	return (
		<Container verticalPaddingInREM={7} paddingMultiplier={4} bg="#fafafa">
			<div>
				Composites <span>&gt;&gt;</span> All Categories
			</div>
			<SooSection
				BGColor="white"
				header={{ title: 'All Categories', align: 'left' }}
			>
				<Categories categories={categories} />
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
			</SooSection>
			<StayTunedSection />
		</Container>
	);
};

export default composite;
