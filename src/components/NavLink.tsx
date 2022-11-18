import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

const NavLink: FC<{
	to: string;
	name: string;
	icon?: (props: any) => JSX.Element;
}> = ({ name, to, icon: Icon }) => {
	const router = useRouter();

	return to.startsWith('/') ? (
		<Link href={to} legacyBehavior>
			<a className={router.pathname == to ? 'active' : ''}>
				{Icon ? <Icon /> : name}
			</a>
		</Link>
	) : (
		<a href={to}>{name}</a>
	);
};

export default NavLink;
