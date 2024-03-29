import CallIcon from '@assets/new/icons/CallIcon';
import EmailIcon from '@assets/new/icons/EmailIcon';
import WhatsappIcon from '@assets/new/icons/WhatsappIcon';
import CustomerService from '@assets/new/images/home/customer-service.jpg';
import Imprint from '@assets/new/images/home/imprint.jpg';
import QuickChange from '@assets/new/images/home/quickchange.jpg';
import { StaticImageData } from 'next/image';
import styled from 'styled-components';
import InfoCard from './InfoCard';

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
			{ link: 'tel:+2347030324696', title: 'Call', Icon: CallIcon },
			{ link: 'mailto:store@orthoex.ng', title: 'Email', Icon: EmailIcon },
			{
				link: 'https://wa.me/+2347030324696',
				title: 'Chat',
				Icon: WhatsappIcon,
			},
		],
	},
	{
		image: QuickChange,
		description: 'We are passionate about empowering human potentials.',
		buttons: [{ link: '/about', title: 'Read more' }],
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

const InfoSectionStyled = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;
		flex: 1;
		padding: 3rem;
		gap: 2rem;
	}
`;
