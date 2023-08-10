import moreArrow from '@assets/new/icons/more-arrow.svg';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import CTA from '@components/CTA';
import CartItem from '@components/CartItem';
import IconText from '@components/IconText';
import { priceFormatter } from '@components/ProductCard';
import ProductSuggestion from '@components/ProductSuggestion';
import { Container } from '@components/styled';
import { ProductVariantType, getRecentlyViewedProducts } from '@data/index';
import { singleDBProductToProductMapper } from '@data/productsData';
import { CartState, useCart } from 'context/cartContext';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const getProductsByMultipleIDs = async (cart: CartState) => {
	try {
		const response = await fetch('/api/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ cart }),
		});
		const products = await response.json();

		return products;
	} catch (errorFromFE) {
		console.log({ error: errorFromFE });
	}
};

const Cart: NextPage<{
	recentlyViewedProducts: ProductVariantType[];
}> = ({ recentlyViewedProducts }) => {
	const { cart, checkout } = useCart();

	const [products, setProducts] = useState<ProductVariantType[]>([]);

	useEffect(() => {
		getProductsByMultipleIDs(cart).then(products => {
			setProducts(products);
		});
	}, [cart]);

	const transformedProducts = products.map(product => ({
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
						<CTA
							disabled={cart.length === 0}
							onClick={() => checkout()}
							style={{ width: '100%' }}>
							Checkout
						</CTA>
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
