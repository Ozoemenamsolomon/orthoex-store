import Link from 'next/link';
import styled from 'styled-components';

export type BreadcrumProps = {
	name: string;
	link: string;
};

const Breadcrumb: React.FC<{ breadcrumb: BreadcrumProps[] }> = ({
	breadcrumb,
}) => (
	<BreadcrumbContainer>
		{breadcrumb.map(({ name, link }, index) => (
			<span key={`breadcrumb-${index}`}>
				<Link href={link}>{name} </Link>
				<Divisor>&gt;&gt;</Divisor>
			</span>
		))}
	</BreadcrumbContainer>
);

export default Breadcrumb;

const Divisor = styled.span`
	color: var(--oex-grey);
	pointer-events: none;
`;

const BreadcrumbContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	font-size: 0.8rem;

	> span:last-of-type {
		> a {
			color: var(--oex-orange);
			pointer-events: none;
		}
		> span {
			display: none;
		}
	}
`;
