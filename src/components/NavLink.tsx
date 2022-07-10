import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

const NavLink: FC<{ to: string; name: string; icon?: any }> = ({
	name,
	to,
	icon,
}) => {
	const router = useRouter();

	return to.startsWith('/') ? (
		<Link href={to}>
			<a className={router.pathname == to ? 'active' : ''}>
				{icon ? (
					<div style={{ position: 'relative', width: 24, aspectRatio: '1' }}>
						<Image layout="fill" src={icon} />
					</div>
				) : (
					name
				)}
			</a>
		</Link>
	) : (
		<a href={to}>{name}</a>
	);
};

export default NavLink;
