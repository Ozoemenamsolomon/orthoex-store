import Breadcrumb from '@components/Breadcrumb';
import ProductSuggestion from '@components/ProductSuggestion';
import StayTunedSection from '@components/sections/StayTunedSection';
import CategorySection, {
	CategoryViewMoreType,
} from '@components/shared/CategorySection';
import SooSection from '@components/SooSection';
import { Container } from '@components/styled';
import { categories } from '@data/categories';
import { getRelatedProducts } from '@data/products';
import { GetStaticProps, NextPage } from 'next';

const viewMoreData: CategoryViewMoreType = {
	link: '/composites/products',
	text: 'View more Products',
};

const Composite: NextPage<{
	popularProducts: Awaited<ReturnType<typeof getRelatedProducts>>;
}> = ({ popularProducts }) => {
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
			<ProductSuggestion title="Popular Products" products={popularProducts} />
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
