import { useRouter } from 'next/router';
import { FC } from 'react';
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
		<div
			style={{
				border: '1px solid #ccc',
				margin: '1rem 0',
				padding: '1rem',
				display: 'flex',
				flexDirection: 'column',
			}}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					backgroundColor: 'var(--oex-orange-mute)',
					marginTop: '-1rem',
					marginInline: '-1rem',
					padding: '1rem',
					paddingBottom: 0,
				}}>
				<p
					style={{
						flex: '1',
						width: '33%',
					}}>
					Checkout on {new Date(created_at).toDateString()}
				</p>
				<p
					style={{
						flex: '1',
						width: '33%',
					}}>
					Totalling {priceFormatter.format(totalPrice)} for {cart.length} item
					{cart.length > 1 ? 's' : ''}
				</p>
				<p
					style={{
						flex: '1',
						width: '33%',
						display: 'flex',
					}}>
					Order reference:{'  '}
					<strong
						style={{ textOverflow: 'ellipsis', overflow: 'hidden', flex: 1 }}>
						{reference}
					</strong>
				</p>
			</div>
			<div>
				{cart.map(item => (
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(4,1fr)',
							gap: '1rem',
							padding: '1rem',
							borderBottom: '1px solid #ccc',
						}}
						key={item.id}>
						<span>
							{item.quantity} x {item.name}
						</span>

						<span>{priceFormatter.format(item.price)}</span>
						<span>{priceFormatter.format(item.price * item.quantity)}</span>

						{JSON.stringify(item.variant, null, 1)}
					</div>
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
		</div>
	);
};

export default OrderItemCard;
