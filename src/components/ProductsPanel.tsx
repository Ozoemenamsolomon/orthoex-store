import CTA from '@components/CTA';
import ProductCard from '@components/ProductCard';
import { ProductDataType } from '@data/productsData';
import styled from 'styled-components';
import { Dashboard } from 'styled-icons/boxicons-solid';
import { ArrowPrevious, Filter } from 'styled-icons/fluentui-system-filled';
import { CheveronLeft, CheveronRight } from 'styled-icons/zondicons';

const ProductsPanel: React.FC<{
	products: ProductDataType[];
	title: string;
}> = ({ title, products }) => (
	<ProductPanelContainer>
		<TitleFilterBar>
			<h2>{title}</h2>
			<SortSelectContainer>
				<h2>Sort by:</h2>
				<select name="sort-by" id="sort-by">
					<option value="popularity">Popularity</option>
					<option value="relevance">Relevance</option>
					<option value="price">Price</option>
				</select>
			</SortSelectContainer>
		</TitleFilterBar>
		<div>
			<span>Showing {products.length} Products</span>
			<span>
				<Filter size={24} color="var(--oex-dark-grey)" />
				<Dashboard size={24} color="var(--oex-orange)" />
			</span>
		</div>
		<ProductCards>
			{products.map((product, index) => (
				<ProductCard key={`product_${index}`} product={product} />
			))}
		</ProductCards>
		{products.length === 0 ? (
			<EmptyProducts>No product to display</EmptyProducts>
		) : (
			<PaginationBar>
				<PaginationButton>
					<ArrowPrevious size={24} />
				</PaginationButton>
				<PaginationButton>
					<CheveronLeft size={24} />
				</PaginationButton>
				<PaginationButton className="active">1</PaginationButton>
				<PaginationButton>2</PaginationButton>
				<PaginationButton>
					<CheveronRight size={24} />
				</PaginationButton>
			</PaginationBar>
		)}
	</ProductPanelContainer>
);

export default ProductsPanel;

const ProductPanelContainer = styled.article`
	background-color: white;
	flex: 2.5;
	@media ${({ theme }) => theme.breakpoints.above.sm} {
		padding: 1rem;
	}
`;

const ProductCards = styled.div`
	--width: 150px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(var(--width), 1fr));
	gap: 2rem 1rem;
	@media ${({ theme }) => theme.breakpoints.above.sm} {
		--width: 200px;
	}
`;

const TitleFilterBar = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 2rem;

	select {
		font-size: 1rem;
		color: var(--oex-dark-grey);
		border: none;
	}

	+ div {
		border-bottom: 1px solid var(--oex-grey);
		border-top: 1px solid var(--oex-grey);
		padding-block: 1rem;
		display: flex;
		justify-content: space-between;
		margin-block: 1rem;
	}
`;

const EmptyProducts = styled.h3`
	grid-column: 1 / -1;
	text-align: center;
	color: var(--oex-dark-grey);
`;

const PaginationBar = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: center;
	padding: 1rem 0;
	margin-top: 1rem;
`;

const PaginationButton = styled(CTA)`
	color: black;
	background-color: white;
	border: 1px solid var(--oex-grey);
	border-radius: 4px;
	padding: 0;

	&.active {
		border-color: var(--oex-orange);
	}
`;

const SortSelectContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;
