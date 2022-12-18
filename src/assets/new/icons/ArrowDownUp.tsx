import React from 'react';

const ArrowDownUp: React.FC<{ rotate: boolean }> = ({ rotate }) => (
	<svg
		style={{ transform: rotate === true ? 'rotate(180deg)' : '' }}
		width="14"
		height="8"
		viewBox="0 0 14 8"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M1.66666 1L6.99999 6.33333L12.3333 1"
			stroke="black"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default ArrowDownUp;
