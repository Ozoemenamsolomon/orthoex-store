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

const Footer = () => {
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
							gap: '1.5rem',
							flex: '1',
						}}
					>
						<div style={{ flex: '1' }}>
							<h5>COMPANY</h5>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								{[
									'About us',
									'Careers',
									'Events',
									'Subscribe',
									'Contact us',
								].map((l, index) => (
									<Link key={`link-${l}-${index}`} href="/">
										<a>{l}</a>
									</Link>
								))}
							</div>
						</div>
						<div style={{ flex: '1' }}>
							<h5>BUSINESSES</h5>{' '}
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								{[
									'Orthopaedics',
									'Composites',
									'Medical',
									'Consumables',
									'Partners',
								].map((l, index) => (
									<Link key={`link-${l}-${index}`} href="/">
										<a>{l}</a>
									</Link>
								))}
							</div>
						</div>
						<div style={{ flex: '1' }}>
							<h5>SUPPORT</h5>{' '}
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								{['FAQ', 'Shipping and delivery', 'Clinical Referrals'].map(
									(l, index) => (
										<Link key={`link-${l}-${index}`} href="/">
											<a>{l}</a>
										</Link>
									)
								)}
							</div>
						</div>
						<div style={{ flex: '1' }}>
							<h5>RESOURCES</h5>{' '}
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								{[
									'Amputee guide',
									'Rehab Edge Magazine',
									'Blog',
									'Subscribe',
								].map((l, index) => (
									<Link key={`link-${l}-${index}`} href="/">
										<a>{l}</a>
									</Link>
								))}
							</div>
						</div>
						<div style={{ flex: '1' }}>
							{' '}
							<h5>MORE INFO</h5>{' '}
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								{['Privacy policy', 'Terms & Conditions', 'Site map'].map(
									(l, index) => (
										<Link key={`link-${l}-${index}`} href="/">
											<a>{l}</a>
										</Link>
									)
								)}
							</div>
						</div>
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
