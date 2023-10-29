import moreArrow from '@assets/new/icons/more-arrow.svg';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { CTALink } from '@components/CTA';
import CartItem from '@components/CartItem';
import IconText from '@components/IconText';
import { priceFormatter } from '@components/ProductCard';
import ProductSuggestion from '@components/ProductSuggestion';
import { Container } from '@components/styled';
import { getRecentlyViewedProducts } from '@data/products';
import { useCart } from 'context/cartContext';
import { NextPage } from 'next';
import styled from 'styled-components';

const Cart: NextPage<{
	recentlyViewedProducts: Awaited<ReturnType<typeof getRecentlyViewedProducts>>;
}> = ({ recentlyViewedProducts }) => {
	const { cart, cartProducts } = useCart({
		withProductDetails: true,
	});

	const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
	const totalPrice =
		cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0) ||
		0;

	return (
		<Container>
			<div>
				<ProductAndDetails style={{}}>
					<div
						style={{
							flex: 1,
						}}>
						<Title>Your cart ({totalItems} items)</Title>
						{cartProducts?.map((product, index) => (
							<CartItem {...product} key={`cart-item-${index}`} />
						))}
					</div>
					<div>
						<Title>Total price</Title>
						<p style={{ display: 'flex', justifyContent: 'space-between' }}>
							<strong>Subtotal</strong>
							<span>{priceFormatter.format(totalPrice)}</span>
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
						<CTALink
							disabled={cart.length === 0}
							href="/composites/checkout/address"
							style={{ width: '100%' }}>
							Checkout
						</CTALink>
						<div style={{ marginTop: '1rem' }}>
							<IconText icon={moreArrow} text={'Continue shopping'}></IconText>
						</div>
					</div>
				</ProductAndDetails>
			</div>
			<ProductSuggestion
				title="Recently viewed"
				products={recentlyViewedProducts}
			/>
		</Container>
	);
};

export default Cart;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps({ req, res }) {
		const session = await getSession(req, res);
		const custier = session?.user.custier;

		const recentlyViewedProducts = await getRecentlyViewedProducts(custier);

		return {
			props: {
				recentlyViewedProducts,
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

const ProductAndDetails = styled.div`
	flex-direction: column;

	@media (min-width: 768px) {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
		flex-direction: row;
	}
`;
