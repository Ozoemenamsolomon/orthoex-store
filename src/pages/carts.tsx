import React, { useState } from 'react';
import styled from 'styled-components';
import CartEmpty from '@components/cart/CartEmpty';
import CartProductItem from '@components/cart/CartProductItem';

const carts = () => {
	const [cartItems, setcartItems] = useState(false);

	const onButtonClick = () => {
		setcartItems(prev => !prev);
	};

	return (
		<PageWrapper>
			{/* <button onClick={onButtonClick}>Toggle</button> */}
			<PageContainer>
				{cartItems ? (
					<CartEmpty />
				) : (
					<>
						<CartSection>
							<CartSummaryWrapper>
								<InfoText>Cart Summary</InfoText>
								<CartSummary>
									<CartTotal>
										<span>Subtotal</span>
										<span>N10,000,000</span>
									</CartTotal>
									<TextSmall>
										Delivery value will be estimated at checkout
									</TextSmall>
								</CartSummary>
							</CartSummaryWrapper>

							<CartProductsWrapper>
								<InfoText>Your Cart (4 items)</InfoText>
								<CartProducts>
									<CartProductItem></CartProductItem>
								</CartProducts>
							</CartProductsWrapper>
						</CartSection>
					</>
				)}
			</PageContainer>
		</PageWrapper>
	);
};

export default carts;

const PageWrapper = styled.div`
	background-color: var(--oex-off-white);
	padding: 0rem;
	min-height: 60vh;

	@media (${({ theme }) => theme.breakpoints.above.md}) {
		padding: 5rem 3rem;
	}
`;

const PageContainer = styled.div`
	max-width: 1000px;
	margin: 0 auto;
`;

const CartSection = styled.div`
	display: flex;
	gap: 2rem;
	flex-direction: column;

	@media (${({ theme }) => theme.breakpoints.above.md}) {
		flex-direction: row-reverse;
	}
`;

const InfoText = styled.span`
	color: var(--text-colour-grey);
	padding: 1rem;
	font-size: 0.9rem;

	@media (${({ theme }) => theme.breakpoints.above.md}) {
		display: none;
	}
`;

const TextSmall = styled.span`
	color: var(--oex-danger);
	font-size: 0.7rem;
	font-weight: 400;

	@media (${({ theme }) => theme.breakpoints.above.md}) {
	}
`;

const CartSummaryWrapper = styled.div`
	margin-top: 1rem;
	@media (${({ theme }) => theme.breakpoints.above.md}) {
	}
`;

const CartSummary = styled.div`
	border-radius: 0.3rem;
	padding: 2rem 1rem;
	background-color: white;
	margin-top: 1.3rem;

	@media (${({ theme }) => theme.breakpoints.above.md}) {
		width: 30%;
		height: 10rem;
	}
`;

const CartTotal = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid var(--text-colour-light-grey);
	padding-bottom: 1rem;
	font-size: 0.9rem;

	@media (${({ theme }) => theme.breakpoints.above.md}) {
	}
`;

const CartProductsWrapper = styled.div`
	@media (${({ theme }) => theme.breakpoints.above.md}) {
	}
`;

const CartProducts = styled.div`
	border-radius: 0.3rem;
	padding: 1rem;

	@media (${({ theme }) => theme.breakpoints.above.md}) {
		background-color: white;
		width: 70%;
		min-height: 30rem;
	}
`;
