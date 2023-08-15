import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';
import CTA from './CTA';
import { priceFormatter } from './ProductCard';

const OrderItemCard: FC<{
	id: number;
	created_at: string;
	totalPrice: number;
	cart: {
		id: number;
		quantity: number;
		name: string;
		price: number;
		variant: any;
	}[];
	reference: string;
	paid: boolean;
	expiresAt: string;
}> = ({ created_at, totalPrice, cart, reference, paid, expiresAt }) => {
	const router = useRouter();

	const isExpired = new Date(expiresAt).getTime() < new Date().getTime();

	return (
		<OrderItemCardContainer>
			<OrderGroupLabel>
				<p>Checkout on {new Date(created_at).toDateString()}</p>
				<p>
					Totalling {priceFormatter.format(totalPrice)} for {cart.length} item
					{cart.length > 1 ? 's' : ''}
				</p>
				<p
					style={{
						display: 'flex',
					}}>
					Order reference:{'  '}
					<strong
						style={{ textOverflow: 'ellipsis', overflow: 'hidden', flex: 1 }}>
						{reference}
					</strong>
				</p>
			</OrderGroupLabel>
			<div>
				{cart.map(item => (
					<CartItemContainer key={item.id}>
						<span>
							{item.quantity} x {item.name}
						</span>

						<span>{priceFormatter.format(item.price)}</span>
						<span>{priceFormatter.format(item.price * item.quantity)}</span>

						{JSON.stringify(item.variant, null, 1)}
					</CartItemContainer>
				))}
			</div>
			{!paid && (
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<CTA
						onClick={() => {
							if (isExpired) return;
							router.push(`/composites/checkout/${reference}`);
						}}>
						{isExpired
							? 'Order Expired'
							: `Pay ${priceFormatter.format(totalPrice)}`}
					</CTA>
					{!isExpired ? (
						<p>
							Order expires in{' '}
							{Math.ceil(
								(new Date(expiresAt).getTime() - new Date().getTime()) /
									(1000 * 60 * 60 * 24),
							)}{' '}
							Day(s)
						</p>
					) : (
						<p>Order expired on {new Date(expiresAt).toDateString()}</p>
					)}
				</div>
			)}
			<hr />
		</OrderItemCardContainer>
	);
};

export default OrderItemCard;

const OrderItemCardContainer = styled.div`
	border: 1px solid #ccc;
	margin: 1rem 0;
	padding: 1rem;
	display: flex;
	flex-direction: column;
`;
const OrderGroupLabel = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: var(--oex-orange-mute);
	margin-top: -1rem;
	margin-inline: -1rem;
	padding: 1rem;
	padding-bottom: 0;

	& > p {
		flex: 1;
		width: 33%;
	}
`;

const CartItemContainer = styled.div`
	display: grid;
	gap: 1rem;
	padding: 1rem;

	@media ${({ theme }) => theme.breakpoints.above.sm} {
		grid-template-columns: repeat(4, 1fr);
	}
`;
