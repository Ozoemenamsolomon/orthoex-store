// TODO solve this temp
import creditCard from '@assets/new/icons/credit-card-black.svg';
import deliveryVan from '@assets/new/icons/delivery-van-black.svg';
import headphone from '@assets/new/icons/headphone-black.svg';
import nigeriaMap from '@assets/new/icons/nigeria.svg';
import ServiceCard, { ServiceCardType } from '@components/ServiceCard';
import SooSection from '@components/SooSection';
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
	{
		title: 'Nationwide delivery',
		description: 'We deliver to all cities in Nigeria',
		image: nigeriaMap,
	},
];

export const ProductCountInput = styled.input`
	padding-block: 1rem;
	font-size: 1rem;
	width: 5ch;
	border: none;
	text-align: center;

	&:not(:read-only) {
		box-shadow: 3px 3px 6px -1px #c6c6c6 inset;
		border-radius: 1rem;
	}

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	&[type='number'] {
		-moz-appearance: textfield;
	}
`;

export const ProductCountControlButton = styled.button`
	height: 2.5rem;
	aspect-ratio: 1;
	border-radius: 50%;
	border: none;
	font-size: 2rem;
	background: var(--oex-light-grey);
	color: #a0a0a0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const DeliveryAndAdvantage = () => (
	<SooSection BGColor="white">
		<Title>Delivery</Title>
		<p>Delivery is charged based on your location at checkout</p>
		<Title>Our Advantages</Title>
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gap: '2rem 0.5rem',
				border: '1px solid #F3F3F3',
				borderRadius: '6px',
				padding: '1rem',
			}}>
			{orderBenefits.map((benefit, index) => (
				<ServiceCard
					small
					className="no-shadow no-padding"
					key={`e-comerce-${index}`}
					service={benefit}
				/>
			))}
		</div>
	</SooSection>
);

export const Title = styled.h2`
	margin: 0;
	font-weight: 600;
	font-size: 1.2rem;
	border-bottom: 1px solid var(--oex-light-grey);
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
	display: flex;
`;
