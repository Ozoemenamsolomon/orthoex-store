import Categories from '@components/Categories';
import ProductCard from '@components/ProductCard';
import StayTunedSection from '@components/sections/StayTunedSection';
import SooSection from '@components/SooSection';
import { Container, ProductCards } from '@components/styled';
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
			verticalPaddingInREM={2}
			paddingMultiplier={4}
			bg="var(--oex-off-white)">
			<Breadcrumb breadcrumb={breadcrumb} />
			<SooSection
				BGColor="white"
				style={{ display: 'flex', flexDirection: 'column' }}
				header={{ title: 'All Categories', align: 'left' }}>
				<Categories categories={categories} />
				<ViewMoreLink href="/composites/products" text="View more Products" />
			</SooSection>
			<SooSection
				BGColor="white"
				header={{ title: 'Popular Products', align: 'left' }}>
				<ProductCards>
					{Array.from({ length: 4 }, () => productsData[0]).map(
						(product, index) => (
							<ProductCard key={`product_${index}`} product={product} />
						),
					)}
				</ProductCards>
			</SooSection>
			<StayTunedSection />
		</Container>
	);
};

export default composite;
