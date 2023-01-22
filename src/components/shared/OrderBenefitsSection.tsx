import ServiceCard, { ServiceCardType } from '@components/ServiceCard';
import deliveryVan from '@assets/new/icons/delivery-van.svg';
import creditCard from '@assets/new/icons/credit-card.svg';
import headphone from '@assets/new/icons/headphone.svg';
import styled from 'styled-components';

const orderBenefits: ServiceCardType[] = [
	{
		title: 'Order by 12PM',
		description: 'Shipped same day',
		image: deliveryVan,
	},
	{
		title: 'Safe payment',
		description: 'Trusted SSL protection',
		image: creditCard,
	},
	{
		title: 'Technical Advice',
		description: 'We offer helpful tips & tricks to aid your craft',
		image: headphone,
	},
];

const OrderBenefitsSection = () => {
	return (
		<Wrapper>
			{orderBenefits.map((benefit, index) => (
				<ServiceCard
					imagePadding
					className="white no-shadow"
					key={`e-comerce-${index}`}
					service={benefit}
				/>
			))}
		</Wrapper>
	);
};

export default OrderBenefitsSection;

const Wrapper = styled.div`
	background-color: var(--oex-orange);
	display: flex;
	flex-direction: column;
	min-height: 300px;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		padding: 0rem 9rem;
	}
`;
