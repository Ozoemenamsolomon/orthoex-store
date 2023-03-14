import moreArrow from '@assets/new/icons/more-arrow.svg';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import CartItem from '@components/CartItem';
import CTA from '@components/CTA';
import IconText from '@components/IconText';
import ProductCard from '@components/ProductCard';
import SooSection from '@components/SooSection';
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
				<div style={{ display: 'flex' }}>
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
						<CTA>Checkout</CTA>
						<IconText icon={moreArrow} text={'Continue shopping'}></IconText>
					</div>
				</div>
			</div>
			<SooSection
				BGColor="white"
				header={{ title: 'Popular Products', align: 'left' }}>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
						gap: '2rem',
					}}>
					{Array.from({ length: 4 }, () => productsData[0]).map(
						(product, index) => (
							<ProductCard key={`product_${index}`} product={product} />
						),
					)}
				</div>
			</SooSection>
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
