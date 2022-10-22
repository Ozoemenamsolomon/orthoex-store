import Categories from '@components/Categories';
import ProductCard from '@components/ProductCard';
import StayTunedSection from '@components/sections/StayTunedSection';
import SooSection from '@components/SooSection';
import { Container } from '@components/styled';
import { categories } from '@data/categories';
import Breadcrumb from '@components/Breadcrumb';
import ViewMoreLink from '@components/ViewMoreLink';
import { productsData } from '@data/productsData';

const composite = () => {
	const breadcrumb = [
		{ name: 'Composites', link: '/composites' },
		{ name: 'All Categories', link: '/composites/categories' },
	];

	return (
		<Container
			verticalPaddingInREM={7}
			paddingMultiplier={4}
			bg="var(--oex-off-white)">
			<Breadcrumb breadcrumb={breadcrumb} />
			<SooSection
				BGColor="white"
				header={{ title: 'All Categories', align: 'left' }}>
				<Categories categories={categories} />
				<ViewMoreLink href="/composites/products" text="View more Products" />
			</SooSection>
			<SooSection
				BGColor="white"
				header={{ title: 'Popular Products', align: 'left' }}>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
						gap: '2rem',
					}}>
					{Array.from({ length: 4 }, () => productsData[0]).map(
						(product, index) => (
							<ProductCard key={`product_${index}`} product={product} />
						),
					)}
				</div>
			</SooSection>
			<StayTunedSection />
		</Container>
	);
};

export default composite;
