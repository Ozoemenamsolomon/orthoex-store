import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';
import { priceFormatter } from './ProductCard';

const Price: FC<{ price: number }> = ({ price }) => {
	const { user } = useUser();
	const router = useRouter();

	return (
		<div style={{ position: 'relative' }}>
			{user ? (
				<PriceText blur={false}>{priceFormatter.format(price)}</PriceText>
			) : (
				<>
					<PriceText blur={true}>{priceFormatter.format(111111.111)}</PriceText>
					<Link
						href={`/api/auth/login?returnTo=${encodeURIComponent(
							router.asPath,
						)}`}>
						Login to view price
					</Link>
				</>
			)}
		</div>
	);
};

export default Price;

const PriceText = styled.p<{ blur: boolean }>`
	font-weight: 300;
	font-size: 0.9rem;
	margin-bottom: 0;
	${({ blur }) =>
		blur &&
		`
		+ a {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 4px;
			backdrop-filter: blur(2px);
			background: #ffffff75;
			}`}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		font-weight: 400;
		font-size: 1.2rem;
	}
`;
