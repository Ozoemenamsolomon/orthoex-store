import React from 'react';
import { Rating as StarRating } from 'react-simple-star-rating';
import styled from 'styled-components';

const ProductStars: React.FC<{ average: number; count: number }> = ({
	average,
	count,
}) => (
	<ProductStarsContainer>
		<StarRating size={12} initialValue={average} readonly />
		<Count>({count || 'No Reviews'})</Count>
	</ProductStarsContainer>
);

export default ProductStars;

const ProductStarsContainer = styled.div`
	display: flex;
	gap: 0.5rem;
	font-size: 0.5rem;

	@media (${({ theme }) => theme.breakpoints.above.md}) {
		font-size: 0.8rem;
	}
`;
const Count = styled.span`
	color: #c7c7cd;
`;
