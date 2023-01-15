import newsletter from '@assets/new/images/newsletter.png';
import { useForm, ValidationError } from '@formspree/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import CTA from '../CTA';
import SooSection from '../SooSection';
import { Container } from '../styled';
import ThankYou from './ThankYou';

const StayTunedSection = () => {
	const [formState, handleSubmit] = useForm('mvonpbje');
	const { asPath } = useRouter();

	return formState.succeeded ? (
		<ThankYou show={formState.succeeded} reason={'for subscribing!'}></ThankYou>
	) : (
		<SooSection id="stay-tuned-section">
			<Container
				paddingMultiplier={6}
				paddingMultiplierSmall={0}
				style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem' }}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '3rem',
						flex: '2.5',
					}}>
					<div>
						<h2>Stay tuned!</h2>
						<p>
							Sign up to be the first to know about new products, workshops &
							special offers.
						</p>
					</div>
					<SubscribeForm onSubmit={handleSubmit}>
						<input type="hidden" name="form-submission-route" value={asPath} />
						<input type="text" name="_gotcha" style={{ display: 'none' }} />
						<div>
							<input
								type="email"
								name="email"
								required
								placeholder="john@mail.com"
							/>
							<ValidationError
								prefix="Email"
								field="email"
								errors={formState.errors}
							/>
						</div>
						<CTA
							type="submit"
							className="no-animate"
							disabled={formState.submitting}>
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
	display: none;

	@media ${({ theme }) => theme.breakpoints.above.sm} {
		display: block;
	}
`;

const SubscribeForm = styled.form`
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
	> div {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		> input {
			flex: 1;
			padding: 0.51rem;
			border: 0.5px solid var(--oex-grey);
			border-radius: 0.5rem;
			outline: none;
		}
		> div {
			color: var(--oex-danger);
		}
	}
`;
