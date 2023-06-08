import { FC } from 'react';
import styled from 'styled-components';
import CategoryCard, { CategoryProps } from './CategoryCard';

const Categories: FC<{ categories: CategoryProps[] }> = ({ categories }) => {
	return (
		<CategoryCardContainer>
			{categories.map((category, index) => (
				<CategoryCard category={category} key={`category_${index}`} />
			))}
		</CategoryCardContainer>
	);
};

export default Categories;

const CategoryCardContainer = styled.div`
	--width: 150px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(var(--width), 1fr));
	gap: 1.5rem 1rem;
	@media (min-width: 768px) {
		--width: 260px;
	}
`;
