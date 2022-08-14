import React, { FC } from 'react';
import CategoryCard, { CategoryProps } from './CategoryCard';

const Categories: FC<{ categories: CategoryProps[] }> = ({ categories }) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
				gap: '1.5rem 1rem',
			}}
		>
			{categories.map((category, index) => (
				<CategoryCard category={category} key={`category_${index}`} />
			))}
		</div>
	);
};

export default Categories;
