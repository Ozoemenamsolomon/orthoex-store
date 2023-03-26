import moreArrow from '@assets/new/icons/more-arrow.svg';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import CartItem from '@components/CartItem';
import CTA from '@components/CTA';
import IconText from '@components/IconText';
import ProductSuggestion from '@components/ProductSuggestion';
import { Container } from '@components/styled';
import { ProductDataType, productsData } from '@data/productsData';
import { NextPage } from 'next';
import styled from 'styled-components';

const Cart: NextPage<{
	products?: ProductDataType[];
}> = ({ products }) => {
	return (
		<Container>
			<div>
				<div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
					<div
						style={{
							flex: 1,
						}}>
						<Title>Your cart (3 items)</Title>
						{products?.map((product, index) => (
							<CartItem product={product} key={`cart-item-${index}`} />
						))}
					</div>
					<div>
						<Title>Total price</Title>
						<p style={{ display: 'flex', justifyContent: 'space-between' }}>
							<strong>Subtotal</strong>
							<span>₦1,000,000.00</span>
						</p>
						<hr
							style={{
								border: 'none',
								borderBottom: '1px solid var(--oex-light-grey)',
							}}
						/>
						<p style={{ color: 'var(--oex-danger)' }}>
							Delivery value will be estimated at checkout
						</p>
						<hr
							style={{
								border: 'none',
								borderBottom: '1px solid var(--oex-light-grey)',
							}}
						/>
						<CTA style={{ width: '100%' }}>Checkout</CTA>
						<div style={{ marginTop: '1rem' }}>
							<IconText icon={moreArrow} text={'Continue shopping'}></IconText>
						</div>
					</div>
				</div>
			</div>
			<ProductSuggestion
				title="Recently viewed"
				products={Array.from({ length: 4 }, () => productsData[0])}
			/>
		</Container>
	);
};

export default Cart;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const products = Array.from(
			{ length: 16 },
			(_, index) =>
				productsData[
					Math.abs(productsData.length - index) % productsData.length
				],
		);

		return {
			props: {
				products,
			},
		};
	},
});

const Title = styled.h2`
	margin: 0;
	font-weight: 600;
	font-size: 1.2rem;
	border-bottom: 1px solid var(--oex-light-grey);
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
	display: flex;
`;
