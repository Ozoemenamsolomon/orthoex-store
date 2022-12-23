import styled from 'styled-components';
import CTA from '../CTA';
import SooSection from '../SooSection';
import newsletter from '@assets/new/images/newsletter.png';
import Image from 'next/image';
import { Container } from '../styled';
import { useForm, ValidationError } from '@formspree/react';
import { useRouter } from 'next/router';

const StayTunedSection = () => {
	const [formState, handleSubmit] = useForm('mvonpbje');
	const { asPath } = useRouter();

	return formState.succeeded ? (
		<ThankYouContainer>
			<div className={formState.succeeded && 'wrapper'}>
				<svg
					className="checkmark"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 52 52">
					<circle
						className="checkmark__circle"
						cx="26"
						cy="26"
						r="25"
						fill="none"
					/>
					<path
						className="checkmark__check"
						fill="none"
						d="M14.1 27.2l7.1 7.2 16.7-16.8"
					/>
				</svg>
			</div>
			<div>
				<h2>Thank you</h2>
				<p>for subscribing!</p>
			</div>
		</ThankYouContainer>
	) : (
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

const ThankYouContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	text-align: center;
	justify-content: center;
	aspect-ratio: 5.5;
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		svg {
			width: 56px;
			height: 56px;
			border-radius: 50%;
			display: block;
			stroke-width: 2;
			stroke: #fff;
			stroke-miterlimit: 10;
			box-shadow: inset 0px 0px 0px #7ac142;
			animation: fill 0.4s ease-in-out 0.4s forwards,
				scale 0.3s ease-in-out 0.9s both;
			> circle {
				stroke-dasharray: 166;
				stroke-dashoffset: 166;
				stroke-width: 2;
				stroke-miterlimit: 10;
				stroke: #7ac142;
				fill: none;
				animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
			}
			> path {
				transform-origin: 50% 50%;
				stroke-dasharray: 48;
				stroke-dashoffset: 48;
				animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
			}
		}
	}
	@keyframes stroke {
		100% {
			stroke-dashoffset: 0;
		}
	}
	@keyframes scale {
		0%,
		100% {
			transform: none;
		}
		50% {
			transform: scale3d(1.1, 1.1, 1);
		}
	}
	@keyframes fill {
		100% {
			box-shadow: inset 0px 0px 0px 30px #7ac142;
		}
	}
	div {
		> h2 {
			font-size: 2rem;
			margin: 0;
		}
		> p {
			font-size: 1.5rem;
		}
	}
`;

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
	> div {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		> input {
			flex: 1;
			padding: 0.51rem;
			border: 0.5px solid var(--oex-light-grey);
		}
		> div {
			color: var(--oex-danger);
		}
	}
`;
