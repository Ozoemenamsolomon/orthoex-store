import styled from 'styled-components';
import {
	Facebook,
	Instagram,
	Linkedin,
	Twitter,
} from '@styled-icons/bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import orthoExLogo from '@assets/images/orthoex-logo-white.png';
import { SocialCTA } from './Header';
import { useRouter } from 'next/router';
import { Container } from './styled';

const Footer = () => {
	const router = useRouter();

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

	if (router.pathname === '/composites') {
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
					// paddingBlockStart: '8rem',
				}}
			>
				<LogoInfoWrapper>
					<Link href="/">
						<a>
							<Logo>
								<Image
									src={orthoExLogo}
									objectPosition="left"
									objectFit="contain"
									layout="fill"
								></Image>
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
				{/* <hr style={{ marginBottom: '2rem', background: 'white', fontSize: "10px" }} /> */}

					<CopyrightLogoWrapper>
						<span>Copyright © 2022 - OrthoEx NG</span>
						<div>
							<p>Follow OrthoEx NG</p>
							<SocialsContainer>
								<SocialCTA>
									<Facebook width={18} />
								</SocialCTA>
								<SocialCTA>
									<Instagram width={18} />
								</SocialCTA>
								<SocialCTA>
									<Linkedin width={18} />
								</SocialCTA>
								<SocialCTA>
									<Twitter width={18} />
								</SocialCTA>
							</SocialsContainer>
						</div>
					</CopyrightLogoWrapper>
				{/* <hr style={{ marginBottom: '5rem', background: 'white' }} /> */}
			</Container>
		</SooFooter>
	);
};

export default Footer;

const SooFooter = styled.footer`
width: 100%;
`;

const Logo = styled.div`
	width: 9rem;
	aspect-ratio: 1.5;
	position: relative;
`;

const FooterLinkGroups = styled.div`
	display: flex;
	flex: 1;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;


	@media(min-width:768px){
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
	@media(min-width:768px){
		width: 40%;
		margin-bottom: 0rem;
	}

`;

const SocialsContainer = styled.div`
	display: flex;
	gap: 0.5rem;
`;

const LogoInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-rap: wrap;
	gap: 5rem;
	flex: 1;
	margin-top: 4rem;
	padding-left: 3rem;


	@media(min-width:768px){
		flex-direction: row;
		padding-left: 0rem;

	}
`

const CopyrightLogoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	justify-content: space-between;
	align-items: start;
	gap: 2rem;
	margin: 3rem 0 5rem;
	width: 100%;
	padding-left: 3rem;


	@media(min-width: 768px){
		padding-left: 0rem;
		&:before{
			content: '';
			position: absolute;
			border-top: solid 1px #fff;
			width: 105%;
			z-index: 5000;
			top: -30%;
			left: -3%;
			right: -3%;
		}
	}

	@media(min-width: 768px){
		flex-direction: row;
		align-items: center;
	}


`