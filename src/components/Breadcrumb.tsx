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
				<Link href={link} legacyBehavior>
					<a>
						<Name>{name}</Name>
					</a>
				</Link>
				<Divisor>&gt;&gt;</Divisor>
			</span>
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
	font-size: 0.8rem;

	> a:last-of-type {
		color: var(--oex-orange);
		pointer-events: none;
	}
`;
