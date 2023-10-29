import { accountSubLinks } from '@data/accountSublinks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Title } from './styled/Temp';

const AccountSubNav = () => {
	const router = useRouter();

	return (
		<AccountSubNavContainer>
			<div
				style={{
					padding: '1rem',
					paddingBottom: '0rem',
				}}>
				<Title>Your OrthoEx Account</Title>
			</div>
			<AccountSubNavList>
				{accountSubLinks.map(({ name, slug }) => (
					<li key={slug}>
						<Link
							className={slug === router.query.slug ? 'active' : ''}
							href={`/account/${slug}`}>
							{name}
						</Link>
					</li>
				))}
			</AccountSubNavList>
		</AccountSubNavContainer>
	);
};

export default AccountSubNav;

const AccountSubNavList = styled.ul`
	display: flex;
	flex-direction: column;
	padding: 0rem;
	margin: 0rem;
	li {
		list-style: none;
		display: flex;
		a {
			text-decoration: none;
			color: #000;
			padding: 1rem 1rem;
			width: 100%;
			&:hover {
				color: #000;
			}
			&.active {
				border-left: 2px solid var(--oex-orange);
				font-weight: 600;
				color: var(--oex-orange);
				background-color: var(--oex-orange-mute);
			}
		}
	}
`;

const AccountSubNavContainer = styled.div`
	background-color: white;
	border-radius: 5px;
	box-shadow: 2px 2px 9px 1px rgb(0 0 0 / 10%);
	min-width: 300px;
	display: none;
	@media ${({ theme }) => theme.breakpoints.above.sm} {
		display: block;
	}
`;
