import styled from 'styled-components';
import {
	Facebook,
	Instagram,
	Linkedin,
	Twitter,
} from '@styled-icons/bootstrap';
import { HeroComp as Hero } from './Hero';
import Link from 'next/link';
import Image from 'next/image';
import orthoExLogo from '../assets/images/orthoex-logo.png';
import FooterBG from '../assets/images/footer-background.png';
import { SocialCTA } from './Header';
import { useRouter } from 'next/router';

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
				{ title: 'Contact us', href: '#' },
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
					{ title: 'Contact us', href: '#' },
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
				links: [{ title: 'Blog', href: '#' }],
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
			<Hero bg={FooterBG}>
				<Logo>
					<Link href="/">
						<a>
							<Image
								src={orthoExLogo}
								objectPosition="left"
								objectFit="contain"
								layout="fill"
							></Image>
						</a>
					</Link>
				</Logo>
				<div
					style={{
						flex: '1',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '2rem',
							flex: '1',
						}}
					>
						{footerLinks.map(({ title, links }, indexTop) => (
							<div style={{ flex: '1' }}>
								<h5>{title}</h5>
								<div
									style={{
										display: 'flex',
										fontSize: '0.9rem',
										flexDirection: 'column',
									}}
								>
									{links.map(({ title, href }, index) => (
										<Link key={`link-${indexTop}-${title}-${index}`} href="/">
											<a>{title}</a>
										</Link>
									))}
								</div>
							</div>
						))}
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBlock: '2.5rem',
							flexWrap: 'wrap',
							gap: '1rem',
						}}
					>
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
					</div>
				</div>
			</Hero>
		</SooFooter>
	);
};

export default Footer;

const SooFooter = styled.footer``;

const Logo = styled.div`
	padding: 1rem 1rem;
	height: 4rem;
	width: 5rem;
	position: relative;
	margin: 1rem;
`;
const SocialsContainer = styled.div`
	display: flex;
	gap: 0.5rem;
`;
