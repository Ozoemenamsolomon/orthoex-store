import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const ServiceCard: FC<{
	service: { name: string; image: StaticImageData };
}> = ({ service: { name, image } }) => (
	<ServiceCardContainer>
		<Link href="/">
			<a>
				<ServiceCardImage>
					<Image objectFit="contain" layout="fill" src={image} />
				</ServiceCardImage>
				<p>{name}</p>
			</a>
		</Link>
	</ServiceCardContainer>
);

export default ServiceCard;

const ServiceCardContainer = styled.div`
	> a {
		padding: 0.8rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		text-align: center;
		height: 100%;
		width: 100%;
	}
	position: relative;
	transition: all 0.2s ease-out;

	&::after {
		height: 0%;
		transition: all 0.2s ease-out;
		content: '';
		position: absolute;
		width: 100%;
		background-color: var(--oex-orange);
		z-index: 1;
		bottom: 0;
		left: 0;
	}
	&:hover::after,
	&:focus-within::after {
		height: 5%;
	}
	&:hover {
		box-shadow: 1px 6px 8px rgb(0 0 0 / 17%);
	}
	p {
		margin-bottom: 0;
	}
`;
const ServiceCardImage = styled.div`
	position: relative;
	aspect-ratio: 1.5;
`;
