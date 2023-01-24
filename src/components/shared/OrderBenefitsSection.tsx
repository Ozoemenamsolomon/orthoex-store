import ServiceCard from '@components/ServiceCard';
import orderBenefits from '@data/orderBenefits';
import styled from 'styled-components';

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
