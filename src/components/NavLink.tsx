import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';

const NavLink: FC<{
	to: string;
	name: string;
	icon?: (props: any) => JSX.Element;
	isRight?: boolean;
}> = ({ name, to, icon: Icon, isRight }) => {
	const router = useRouter();

	return to.startsWith('/') ? (
		<Link href={to} legacyBehavior>
			<a
				style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
				className={router.pathname == to ? 'active' : ''}>
				{Icon && <Icon />}
				<LinkName isRight={isRight}>{name}</LinkName>
			</a>
		</Link>
	) : (
		<Link href={to}>{name}</Link>
	);
};

export default NavLink;

const LinkName = styled.span<{ isRight?: boolean }>`
	@media ${({ theme }) => theme.breakpoints.above.sm} {
		${({ isRight }) => isRight && 'display: none'}
	}
`;
