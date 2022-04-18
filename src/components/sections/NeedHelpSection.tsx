import { CTA } from '../Header';
import ServiceCard, { ServiceCardType } from '../ServiceCard';
import SooSection from '../SooSection';
import { ServicesCards } from '../styled';
import helpIcon from '../../assets/images/help-icon_ImgID1.png';
import chatIcon from '../../assets/images/chat-icon_ImgID1.png';
import phoneIcon from '../../assets/images/phone-icon_ImgID1.png';

const helps: ServiceCardType[] = [
	{
		description:
			'Talk To A Customer Care Representative \n\n Mon-Fri: 9:00am-5:00pm',
		image: phoneIcon,
		cta: <CTA>DIAL NO.</CTA>,
	},
	{
		description: 'Chat with a Product expert',
		image: chatIcon,
		cta: <CTA>LIVE CHAT</CTA>,
	},
	{
		description:
			'Find a list of answers to the mostPopular questions that are asked',
		image: helpIcon,
		cta: <CTA>ONLINE HELP</CTA>,
	},
];

const NeedHelpSection = () => {
	return (
		<SooSection>
			<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
				<h2>Do you Need help?</h2>
				<p>We have several resources available to help you with our products</p>
			</div>

			<ServicesCards className="bigger">
				{helps.map((quality) => (
					<ServiceCard className="no-animate" service={quality} />
				))}
			</ServicesCards>
		</SooSection>
	);
};

export default NeedHelpSection;
