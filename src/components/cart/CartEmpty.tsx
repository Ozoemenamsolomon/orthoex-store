import React from 'react';
import styled from 'styled-components';
import CartIcon from '@assets/new/icons/empty-cart';
import { CTALink } from '@components/CTA';

const CartEmpty = () => {
	return (
		<Container>
			<CartIcon />
			<p>Your cart is empty, please add a few items here</p>
			<CTALink href="/" className="no-animate btn">
				Start shopping
			</CTALink>
		</Container>
	);
};

export default CartEmpty;

const Container = styled.div`
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2rem;
	min-height: 60vh;
	border-radius: 0.3rem;

	& .btn {
		font-size: 0.8rem;
		font-weight: 600;
		padding: 0.8rem 1.2rem;
		width: 80%;
	}

	@media (${({ theme }) => theme.breakpoints.above.md}) {
		& .btn {
			width: 50%;
		}
	}
`;
