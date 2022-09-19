import React from 'react';
import StarRating from 'react-svg-star-rating';

const ProductStars: React.FC<{ stars: number; count: number }> = ({
	stars,
	count,
}) => (
	<div>
		<StarRating size={16} initialRating={stars} isReadOnly />
		<span>({count})</span>
	</div>
);

export default ProductStars;
