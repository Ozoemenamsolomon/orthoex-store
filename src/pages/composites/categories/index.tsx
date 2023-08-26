import Breadcrumb from '@components/Breadcrumb';
import { ProductCardProp } from '@components/ProductCard';
import ProductSuggestion from '@components/ProductSuggestion';
import StayTunedSection from '@components/sections/StayTunedSection';
import CategorySection, {
	CategoryViewMoreType,
} from '@components/shared/CategorySection';
import SooSection from '@components/SooSection';
import { Container } from '@components/styled';
import { categories } from '@data/categories';
import {
	getRelatedProducts,
	ProductVariantType,
	singleDBProductToProductMapper,
} from '@data/products';
import { GetStaticProps, NextPage } from 'next';

const viewMoreData: CategoryViewMoreType = {
	link: '/composites/products',
	text: 'View more Products',
};

const Composite: NextPage<{ popularProducts: ProductVariantType[] }> = ({
	popularProducts,
}) => {
	const transformedProducts: ProductCardProp[] = popularProducts.map(product =>
		singleDBProductToProductMapper(product),
	);

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
				<CategorySection cards={categories} viewMore={viewMoreData} />
			</SooSection>
			<ProductSuggestion
				title="Popular Products"
				products={transformedProducts}
			/>
			<StayTunedSection />
		</Container>
	);
};

export default Composite;

export const getStaticProps: GetStaticProps = async () => {
	const popularProductCode = 'PRO-08013';

	const popularProducts = await getRelatedProducts(popularProductCode);

	return {
		props: {
			popularProducts,
		},
	};
};
