import React from 'react';
import styled from 'styled-components';

const ThankYou: React.FC<{ show: boolean; reason: string }> = ({
	show,
	reason,
}) => {
	return (
		<ThankYouContainer>
			<div className={show ? 'wrapper' : ''}>
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
				<p>{reason}</p>
			</div>
		</ThankYouContainer>
	);
};

export default ThankYou;

export const ThankYouContainer = styled.div`
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
