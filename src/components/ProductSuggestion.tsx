import { ProductDataType } from '@data/productsData';
import ProductCard from './ProductCard';
import SooSection from './SooSection';
import { ProductCards } from './styled';

type Props = { products: ProductDataType[]; title: string };

const ProductSuggestion = ({ title, products }: Props) => {
	return (
		<SooSection BGColor="white" header={{ title: title, align: 'left' }}>
			<ProductCards>
				{products.map((product, index) => (
					<ProductCard key={`product_${index}`} product={product} />
				))}
			</ProductCards>
		</SooSection>
	);
};

export default ProductSuggestion;
