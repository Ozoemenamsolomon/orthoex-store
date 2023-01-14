import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';
import styled from 'styled-components';

export type CategoryProps = {
	name: string;
	slug: string;
	image: StaticImageData | string;
};
type CategoryCardProps = {
	category: CategoryProps;
};

const CategoryCard: FC<CategoryCardProps> = ({
	category: { name, image, slug },
}) => {
	return (
		<a href={`/composites/categories/${slug}`}>
			<CategoryCardContainer>
				<p>{name}</p>
				<Image src={image} alt="placeholder" />
			</CategoryCardContainer>
		</a>
	);
};

export default CategoryCard;

const CategoryCardContainer = styled.div`
	border: 1px solid var(--oex-grey);
	border-radius: 0.81rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	p {
		text-align: center;
	}

	&:hover {
		border: 1px solid var(--oex-orange);
	}
`;
