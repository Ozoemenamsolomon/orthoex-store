import { FC } from 'react';
import Image from 'next/image';

const IconText: FC<{ icon: StaticImageData; text: string }> = ({
	icon,
	text,
}) => (
	<div
		style={{
			display: 'flex',
			position: 'relative',
			gap: '1rem',
			color: 'var(--oex-orange)',
		}}>
		<span>{text}</span>
		<Image alt="icon" object-fit="contain" src={icon} />
	</div>
);

export default IconText;
