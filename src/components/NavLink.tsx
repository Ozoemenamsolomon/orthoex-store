import { useRouter } from 'next/router';
import { FC } from 'react';
import Link from 'next/link';

const NavLink: FC<{ to: string; name: string }> = ({ name, to }) => {
	const router = useRouter();

	return to.startsWith('/') ? (
		<Link href={to}>
			<a className={router.pathname == to ? 'active' : ''}>{name}</a>
		</Link>
	) : (
		<a href={to}>{name}</a>
	);
};

export default NavLink;
