import Image, { StaticImageData } from 'next/image';
import React from 'react';
import styled from 'styled-components';

import { CTALink } from './CTA';

export type ImageInfoHeaderType = {
	image: StaticImageData;
	heading: string;
	paragraph: string;
	cta?: { link: string; text: string };
};
interface ImageInfoHeaderProps {
	data: ImageInfoHeaderType;
}

const ImageInfoHeader: React.FC<ImageInfoHeaderProps> = ({ data }) => {
	const { image, heading, paragraph, cta } = data;
	return (
		<StyledDiv>
			<StyledImageDiv>
				<Image src={image} style={{ objectFit: 'cover' }} fill alt="image" />
			</StyledImageDiv>

			<StyledContentDiv>
				<h2>{heading}</h2>
				<p>{paragraph}</p>
				{cta && (
					<CTALink className="no-animate" href={cta.link}>
						{cta.text}
					</CTALink>
				)}
			</StyledContentDiv>
		</StyledDiv>
	);
};

export default ImageInfoHeader;

const StyledDiv = styled.div`
	padding: 1rem 0rem;
	margin-bottom: 1rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		padding: 2rem;
		margin-bottom: 4rem;
		gap: 8rem;
	}
`;

const StyledImageDiv = styled.div`
	position: relative;
	margin-bottom: 4rem;
	overflow: hidden;
	border-radius: 0.5rem;
	aspect-ratio: 1;
	box-shadow: 0.9rem 0.9rem var(--oex-orange);
	max-height: 25rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		width: 32%;
		margin-bottom: 0rem;
	}
`;

const StyledContentDiv = styled.div`
	& > h2 {
		font-size: 2rem;
		font-weight: 400;
		line-height: 38px;
		text-align: left;
		margin-bottom: 2rem;
	}

	& > p {
		font-size: 1rem;
		font-weight: 350;
		line-height: 1.5rem;
		letter-spacing: 0.03rem;
		text-align: left;
		margin-bottom: 2rem;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		width: 50%;

		& > h2 {
			font-size: 3rem;
			font-weight: 400;
			line-height: 3rem;
		}
		& > p {
			font-weight: 400;
		}

		& > a > button {
			width: 19rem;
		}
	}
`;
