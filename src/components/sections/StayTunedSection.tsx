import styled from 'styled-components';
import { CTA } from '../Header';
import SooSection from '../SooSection';

const StayTunedSection = () => {
	return (
		<SooSection twoColumns>
			<div>
				<h2>Stay tuned!</h2>
				<p>
					Sign up to be the first to know about new products, workshops and
					special offers
				</p>
			</div>
			<div>
				<SubscribeForm>
					<input type="tel" placeholder="Your Whatsapp Number" />
					<input type="email" placeholder="Your email" />
					<CTA type="submit">Subscribe</CTA>
				</SubscribeForm>
			</div>
		</SooSection>
	);
};

export default StayTunedSection;

const SubscribeForm = styled.form`
	display: flex;
	gap: 1rem;
	flex: 1;
	flex-direction: column;
	max-width: 350px;
	margin-inline: auto;

	input {
		padding: 0.51rem;
	}
`;
