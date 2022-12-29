import React, { FC } from 'react';
import styled from 'styled-components';

export enum PRODUCTTYPE {
	OEX5302 = 'OEX5302',
	OEX5311 = 'OEX5311',
}

interface FinalAmountProps {
	productType: PRODUCTTYPE;
	partA: number;
	partB: number;
}

export const FinalAmount: FC<FinalAmountProps> = ({
	productType,
	partA,
	partB,
}) => {
	return (
		<FinalAmountWrapper>
			<ProductRatio>
				<Product type={productType}>{productType}</Product>
			</ProductRatio>
			<Parts>
				<span>Part A</span>
				<span>{`${partA ? partA : '--'}Kg`}</span>
			</Parts>
			<Parts>
				<span>Part B</span>
				<span>{`${partB ? partB : '--'}Kg`}</span>
			</Parts>
		</FinalAmountWrapper>
	);
};

export default FinalAmount;

const FinalAmountWrapper = styled.div`
	margin-top: 2rem;
`;

const ProductRatio = styled.div`
	// padding: 0rem 0.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;
`;

const Product = styled.span<{ type: string }>`
	background-color: ${({ type }) =>
		type === PRODUCTTYPE.OEX5302
			? 'var(--oex-light-success)'
			: 'var(--oex-light-orange)'};
	color: ${({ type }) =>
		type === PRODUCTTYPE.OEX5302
			? 'var(--oex-success)'
			: 'var(--oex-yellow)'};);
	padding: 0.5rem;
`;

const Parts = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 2rem 1rem;
	// margin-top: 2rem;
	color: var(--text-colour-grey);

	@media (${({ theme }) => theme.breakpoints.above.md}) {
		font-size: 1.2rem;
	}
`;
