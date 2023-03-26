import Breadcrumb from '@components/Breadcrumb';
import ProductSuggestion from '@components/ProductSuggestion';
import StayTunedSection from '@components/sections/StayTunedSection';
import CategorySection, {
	CategoryViewMoreType,
} from '@components/shared/CategorySection';
import SooSection from '@components/SooSection';
import { Container } from '@components/styled';
import { categories } from '@data/categories';
import { productsData } from '@data/productsData';

const viewMoreData: CategoryViewMoreType = {
	link: '/composites/products',
	text: 'View more Products',
};

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
				<CategorySection cards={categories} viewMore={viewMoreData} />
			</SooSection>
			<ProductSuggestion
				title="Popular Products"
				products={Array.from({ length: 4 }, () => productsData[0])}
			/>
			<StayTunedSection />
		</Container>
	);
};

export default composite;
