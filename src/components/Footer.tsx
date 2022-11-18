import styled from 'styled-components';
import {
	Facebook,
	Instagram,
	Linkedin,
	Twitter,
} from '@styled-icons/bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import orthoExLogo from '@assets/new/logos/orthoex-logo-white.svg';
import { Container } from './styled';
import { CTALink } from './CTA';

type FooterProp = { pathname: string };

let footerLinks: {
	title: string;
	links: { title: string; href: string }[];
}[] = [
	{
		title: 'COMPANY',
		links: [
			{ title: 'About us', href: '#' },
			{ title: 'Careers', href: '#' },
			{ title: 'Events', href: '#' },
			{ title: 'Contact us', href: '/contact' },
		],
	},
	{
		title: 'BUSINESSES',
		links: [
			{ title: 'Orthopaedics', href: '#' },
			{ title: 'Composites', href: '#' },
			{ title: 'Medical', href: '#' },
			{ title: 'Consumables', href: '#' },
			{ title: 'Partners', href: '#' },
		],
	},
	{
		title: 'SUPPORT',
		links: [
			{ title: 'FAQ', href: '#' },
			{ title: 'Shipping and delivery', href: '#' },
			{ title: 'Clinical Referrals', href: '#' },
		],
	},
	{
		title: 'RESOURCES',
		links: [
			{ title: 'Amputee guide', href: '#' },
			{ title: 'Rehab Edge Magazine', href: '#' },
			{ title: 'Blog', href: '#' },
			{ title: 'Subscribe', href: '#' },
		],
	},
	{
		title: 'MORE INFO',
		links: [
			{ title: 'Privacy policy', href: '#' },
			{ title: 'Terms & Conditions', href: '#' },
			{ title: 'Site map', href: '#' },
		],
	},
];

const Footer: React.FC<FooterProp> = ({ pathname }) => {
	if (pathname === '/composites') {
		footerLinks = [
			{
				title: 'COMPANY',
				links: [
					{ title: 'About us', href: '#' },
					{ title: 'Careers', href: '#' },
					{ title: 'Events', href: '#' },
					{ title: 'Contact us', href: '/contact' },
				],
			},
			{
				title: 'BUSINESSES',
				links: [
					{ title: 'Orthopaedics', href: '#' },
					{ title: 'Composites', href: '#' },
					{ title: 'Medical', href: '#' },
					{ title: 'Consumables', href: '#' },
					{ title: 'Partners', href: '#' },
				],
			},
			{
				title: 'RESOURCES',
				links: [
					{ title: 'Blog', href: '#' },
					{ title: 'Subscribe', href: '#' },
				],
			},
			{
				title: 'SUPPORT',
				links: [
					{ title: 'FAQ', href: '#' },
					{ title: 'Shipping and delivery', href: '#' },
				],
			},
			{
				title: 'MORE INFO',
				links: [
					{ title: 'Privacy policy', href: '#' },
					{ title: 'Terms & Conditions', href: '#' },
					{ title: 'Site map', href: '#' },
				],
			},
		];
	}

	return (
		<SooFooter>
			<Container
				style={{
					color: 'white',
				}}
			>
				<LogoInfoWrapper>
					<Link href="/" legacyBehavior>
						<a>
							<Logo>
								<Image
									src={orthoExLogo}
									objectPosition="left"
									object-fit="contain"
									layout="fill"
									alt="OrthoEx Logo"
								/>
							</Logo>
						</a>
					</Link>

					<FooterLinkGroups>
						{footerLinks.map(({ title, links }, indexTop) => (
							<FooterLinkGroup key={indexTop}>
								<h5>{title}</h5>
								<div
									style={{
										display: 'flex',
										fontSize: '0.9rem',
										flexDirection: 'column',
										gap: '1rem',
									}}
								>
									{links.map(({ title, href }, index) => (
										<Link
											legacyBehavior
											key={`link-${indexTop}-${title}-${index}`}
											href={href}
										>
											<a>{title}</a>
										</Link>
									))}
								</div>
							</FooterLinkGroup>
						))}
					</FooterLinkGroups>
				</LogoInfoWrapper>

				<StyledHorionalLine />

				<CopyrightLogoWrapper>
					<span>Copyright © 2022 - OrthoEx NG</span>
					<div>
						<p>Follow OrthoEx NG</p>
						<SocialsContainer>
							<CTALink
								isSocial={true}
								target="_blank"
								rel="noopener noreferrer"
								href="https://www.facebook.com/orthoexng"
							>
								<Facebook width={18} />
							</CTALink>
							<CTALink
								isSocial={true}
								target="_blank"
								rel="noopener noreferrer"
								href="https://www.instagram.com/orthoex_nigeria/"
							>
								<Instagram width={18} />
							</CTALink>
							<CTALink
								isSocial={true}
								target="_blank"
								rel="noopener noreferrer"
								href="https://www.linkedin.com/company/orthoexnigeria/"
							>
								<Linkedin width={18} />
							</CTALink>
							<CTALink
								isSocial={true}
								target="_blank"
								rel="noopener noreferrer"
								href="https://twitter.com/OrthoExNg"
							>
								<Twitter width={18} />
							</CTALink>
						</SocialsContainer>
					</div>
				</CopyrightLogoWrapper>
			</Container>
		</SooFooter>
	);
};

export default Footer;

const SooFooter = styled.footer`
	width: 100%;
	background-color: black;
	padding-bottom: 3rem;
`;

const Logo = styled.div`
	width: 9rem;
	aspect-ratio: 1.5;
	position: relative;
`;

const StyledHorionalLine = styled.hr`
	margin-block-start: 2rem;
	margin-bottom: 2rem;
	background: white;
	font-size: 10px;
	position: absolute;
	width: 100%;
	left: 0;
`;

const FooterLinkGroups = styled.div`
	display: flex;
	flex: 1;
	justify-content: space-between;
	flex-wrap: wrap;

	@media (min-width: 768px) {
		flex-wrap: nowrap;
		padding-left: 0rem;
	}
`;

const FooterLinkGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3rem;
	width: 50%;
	margin-bottom: 4rem;

	> h5 {
		margin: 0;
		font-size: 1.2rem;
	}
	@media (min-width: 768px) {
		margin-bottom: 0rem;
	}
`;

export const SocialsContainer = styled.div`
	display: flex;
	gap: 0.5rem;
`;

const LogoInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	gap: 5rem;
	flex: 1;
	padding-top: 3rem;
	padding-left: 3rem;

	@media (min-width: 768px) {
		flex-direction: row;
		padding-left: 0rem;
	}
`;

const CopyrightLogoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	justify-content: space-between;
	align-items: start;
	gap: 2rem;
	margin-block-start: 3rem;

	@media (min-width: 768px) {
		padding-left: 0rem;
	}

	@media (min-width: 768px) {
		flex-direction: row;
		align-items: center;
	}
`;
