import React from 'react';
import styled from 'styled-components';
import CustomerService from '@assets/new/images/home/customer-service.jpg';
import Imprint from '@assets/new/images/home/imprint.jpg';
import QuickChange from '@assets/new/images/home/quickchange.jpg';
import InfoCard from './InfoCard';
import { StaticImageData } from 'next/image';
import WhatsappIcon from '@assets/new/icons/WhatsappIcon';
import EmailIcon from '@assets/new/icons/EmailIcon';
import CallIcon from '@assets/new/icons/CallIcon';

// TODO: check what files use this export
export type CustomIcon = ({
	color,
}: {
	color?: string | undefined;
}) => JSX.Element;

interface InfoSectionType {
	image: StaticImageData;
	description: string;
	buttons: {
		link: string;
		title: string;
		Icon?: ({ color }: { color?: string | undefined }) => JSX.Element;
	}[];
}
[];

const InfoSectionData: InfoSectionType[] = [
	{
		image: CustomerService,
		description:
			'Our customer service team is available via email, phone call and WhatsApp.',
		buttons: [
			{ link: '', title: 'Call', Icon: CallIcon },
			{ link: '', title: 'Email', Icon: EmailIcon },
			{ link: '', title: 'Chat', Icon: WhatsappIcon },
		],
	},
	{
		image: QuickChange,
		description: 'We are passionate about empowering human potentials.',
		buttons: [{ link: '', title: 'Read more' }],
	},
	{
		image: Imprint,
		description:
			'Our materials are represented in hundreds of products across multiple markets in Nigeria.',
		buttons: [{ link: '#product-vertical', title: 'View Products' }],
	},
];

function InfoSection() {
	return (
		<InfoSectionStyled>
			{InfoSectionData.map((item, index) => (
				<InfoCard
					key={index}
					buttons={item.buttons}
					image={item.image}
					description={item.description}
				/>
			))}
		</InfoSectionStyled>
	);
}

export default InfoSection;

export const InfoSectionStyled = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: 2rem;

	@media (min-width: 768px) {
		flex-direction: row;
		flex: 1;
		padding: 3rem;
		gap: 2rem;
	}
`;
