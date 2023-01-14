import HeaderBG from '@assets/images/header-background.png';
import FabricationHub from '@assets/new/icons/orthopaedics/fabrication-hub.svg';
import HealthProfessionals from '@assets/new/icons/orthopaedics/health-professionals.svg';
import LinersSuspensionPickers from '@assets/new/icons/orthopaedics/liners-suspension-picker.svg';
import Patients from '@assets/new/icons/orthopaedics/patients.svg';
import { CTALink } from '@components/CTA';
import { StyledHeading } from '@components/FeaturedEvents';
import { HeroComp as Hero } from '@components/Hero';
import HeroContent from '@components/HeroContent';
import ServiceCard, { ServiceCardType } from '@components/ServiceCard';
import styled from 'styled-components';

//
const StyledCTALink = styled(CTALink)`
background-color: var(--oex-off-white);

	@media ${prop => prop.theme.breakpoints.above.sm} {
		padding: 1rem;
		font-size: 1rem;
	}
`;

const infoCardsData: ServiceCardType[] = [
	{
		title: 'Patients',
		description:
			'You are not alone; we are here to help. OrthoEx supports amputees, people needing orthosis, and their families with the resources they need to live limitless lives.',
		image: Patients,
		cta: (
			<StyledCTALink href="" white>
				Patient resources
			</StyledCTALink>
		),
	},
	{
		title: 'Liners and Suspension picker',
		description:
			'Use our Liners and suspension size guide to assist you with deciding the right product fit for your patients.',
		image: LinersSuspensionPickers,
		cta: (
			<StyledCTALink href="" white>
				Select a product
			</StyledCTALink>
		),
	},
	{
		title: 'Fabrication Hub',
		description:
			'We reduce your overhead cost and help you focus on what matters most- your patients.',
		image: FabricationHub,
		cta: (
			<StyledCTALink href="" white>
				Read more
			</StyledCTALink>
		),
	},
	{
		title: 'Healthcare professionals',
		description:
			'With our passion for a quality life and excellence in clinical practice, we create value for our customers and challenge the limits of human potential.',
		image: HealthProfessionals,
		cta: (
			<StyledCTALink href="" white>
				Read more
			</StyledCTALink>
		),
	},
];

function orthopaedics() {
	return (
		<>
			<Hero darkenBG bg={HeaderBG}>
				<HeroContent
					title={'We equip Clinicians for success'}
					claim={
						'We support and equip clinicians to be successful in their roles through access to the right prosthetic and orthotic components, tools and resources needed for their best work- enabling them to deliver the highest quality of care to their patients.'
					}
					cta={<CTALink href="/composites/categories">Shop now</CTALink>}
				/>
			</Hero>
			<StyledHeading>
				Diverse solutions for your patient&apos;s unique needs
			</StyledHeading>
			<InfoCards>
				{infoCardsData.map((info, index) => (
					<ServiceCard bgColor={'var(--oex-off-white)'} greyFont service={info} key={`infoCardsData=${index}`} />
				))}
			</InfoCards>
		</>
	);
}

export default orthopaedics;

const InfoCards = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem;
	gap: 2rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;
		justify-content: space-around;
		gap: 0rem;

		//  TODO : have a look at this
		& > div {
			height: auto;
			width: 20%;
		}
	}
`;

