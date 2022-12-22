import styled from 'styled-components';
import CTA from '../CTA';
import SooSection from '../SooSection';
import newsletter from '@assets/new/images/newsletter.png';
import Image from 'next/image';
import { Container } from '../styled';

const StayTunedSection = () => {
	return (
		<SooSection>
			<Container
				paddingMultiplier={6}
				paddingMultiplierSmall={0}
				style={{ display: 'flex', alignItems: 'flex-end' }}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
					<div>
						<h2>Stay tuned!</h2>
						<p>
							Sign up to be the first to know about new products, workshops &
							special offers.
						</p>
					</div>
					<SubscribeForm>
						<input type="email" placeholder="Enter your email address here" />
						<CTA type="submit" className="no-animate">
							Subscribe
						</CTA>
					</SubscribeForm>
				</div>
				<ImageContainer>
					<Image
						alt="newsletter image"
						object-fit="contain"
						fill
						src={newsletter}
					/>
				</ImageContainer>
			</Container>
		</SooSection>
	);
};

export default StayTunedSection;

const ImageContainer = styled.div`
	position: relative;
	flex: 1;
	aspect-ratio: 1;
	margin-left: 6rem;
	display: none;

	@media (min-width: 600px) {
		display: block;
	}
`;

const SubscribeForm = styled.form`
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;

	/* max-width: 350px; */
	/* margin-inline: auto; */

	input {
		flex: 1;
		padding: 0.51rem;
		border: 0.5px solid var(--oex-light-grey);
	}
`;
