import moreArrow from '@assets/new/icons/more-arrow.svg';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { CTALink } from '@components/CTA';
import CartItem from '@components/CartItem';
import IconText from '@components/IconText';
import { priceFormatter } from '@components/ProductCard';
import ProductSuggestion from '@components/ProductSuggestion';
import { Container } from '@components/styled';
import { ProductVariantType, getRecentlyViewedProducts } from '@data/index';
import { singleDBProductToProductMapper } from '@data/productsData';
import { useCart } from 'context/cartContext';
import { NextPage } from 'next';
import styled from 'styled-components';

const Cart: NextPage<{
	recentlyViewedProducts: ProductVariantType[];
}> = ({ recentlyViewedProducts }) => {
	const { cart, cartProducts } = useCart({
		withProductDetails: true,
	});

	const transformedProducts = cartProducts.map(product => ({
		...singleDBProductToProductMapper(product),
		quantity:
			cart.find(item => item.productVariantID === product.variantID.toString())
				?.quantity || 0,
	}));

	const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
	const totalPrice =
		transformedProducts.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0,
		) || 0;

	const transformedRecentlyViewedProducts = recentlyViewedProducts?.map(
		product => singleDBProductToProductMapper(product),
	);

	return (
		<Container>
			<div>
				<ProductAndDetails style={{}}>
					<div
						style={{
							flex: 1,
						}}>
						<Title>Your cart ({totalItems} items)</Title>
						{transformedProducts?.map((product, index) => (
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
				products={transformedRecentlyViewedProducts}
			/>
		</Container>
	);
};

export default Cart;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const recentlyViewedProducts = await getRecentlyViewedProducts();

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
