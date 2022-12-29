import styled from 'styled-components';
import CTA from './CTA';
import { priceFormatter } from './ProductCard';
import ViewMoreLink from './ViewMoreLink';

const CartTotalPanel: React.FC<{}> = ({}) => {
	return (
		<FilterPanelContainer>
			<Title>Total price</Title>
			<Title>
				Subtotal <span>{priceFormatter.format(10_000_000)}</span>
			</Title>
			<Title>Delivery value will be estimated at checkout</Title>
			<CTA>Checkout</CTA>
			<ViewMoreLink text="Continue shopping" href="/composites/products" />
		</FilterPanelContainer>
	);
};

export default CartTotalPanel;

const FilterPanelContainer = styled.aside`
	position: sticky;
	top: 7rem;
	background-color: white;
	padding: 1rem;
	display: none;
	flex: 1;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		display: flex;
		gap: 1rem;
		flex-direction: column;
	}
`;

const Title = styled.h2`
	margin: 0;
	font-weight: 600;
	font-size: 1.2rem;
	border-bottom: 1px solid var(--oex-light-grey);
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
	display: flex;
`;
