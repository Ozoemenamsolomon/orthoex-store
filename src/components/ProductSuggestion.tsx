import ProductCard, { ProductCardProp } from './ProductCard';
import SooSection from './SooSection';
import { ProductCards } from './styled';

type Props = { products: ProductCardProp[]; title: string };

const ProductSuggestion = ({ title, products }: Props) => {
	return (
		<SooSection BGColor="white" header={{ title: title, align: 'left' }}>
			<ProductCards>
				{products.map((product, index) => (
					<ProductCard key={`product_${index}`} {...product} />
				))}
			</ProductCards>
		</SooSection>
	);
};

export default ProductSuggestion;
