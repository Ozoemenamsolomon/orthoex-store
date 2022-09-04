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
		{breadcrumb.map(({ name, link }) => (
			<>
				<Link href={link}>
					<a>
						<Name>{name}</Name>
					</a>
				</Link>
				<Divisor>&gt;&gt;</Divisor>
			</>
		))}
	</BreadcrumbContainer>
);

export default Breadcrumb;

const Name = styled.span``;
const Divisor = styled.span`
	color: var(--oex-grey);
	pointer-events: none;

	&:last-child {
		display: none;
	}
`;

const BreadcrumbContainer = styled.div`
	display: flex;
	gap: 0.2rem;

	> a:last-of-type {
		color: var(--oex-orange);
		pointer-events: none;
	}
`;
