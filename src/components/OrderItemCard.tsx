import { useRouter } from 'next/router';
import { FC } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import CTA from './CTA';
import CartItem from './CartItem';
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
				<p>
					Order reference:{'  '}
					<strong
						onClick={() => {
							navigator.clipboard.writeText(reference);
							toast.success('Order reference copied to clipboard');
						}}
						title={reference}>
						{reference}
					</strong>
				</p>
				{!paid && (
					<div
						style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
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
			</OrderGroupLabel>
			<details>
				<summary>View products</summary>
				<div>
					{cart?.map((item: any, index: any) => (
						<CartItem readOnly key={`order-product-item-${index}`} {...item} />
					))}
				</div>
			</details>
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
	justify-content: space-between;
	background-color: var(--oex-orange-mute);
	margin-top: -1rem;
	margin-inline: -1rem;
	padding: 1rem;
	padding-bottom: 0;
	& > p {
		&:has(> strong) {
			display: flex;
			gap: 0.5rem;
		}
		& > strong {
			max-width: 150px;
			text-overflow: ellipsis;
			overflow: hidden;
			cursor: pointer;
		}
	}

	@media ${({ theme }) => theme.breakpoints.above.sm} {
		display: flex;
		& > p {
			flex: 1;
			width: 33%;
		}
	}
`;

const CartItemContainer = styled.div`
	display: grid;
	gap: 1rem;
	padding: 1rem;

	> hr {
		grid-column: 1 / -1;
		width: 100%;
	}

	@media ${({ theme }) => theme.breakpoints.above.sm} {
		grid-template-columns: repeat(4, 1fr);
	}
`;
