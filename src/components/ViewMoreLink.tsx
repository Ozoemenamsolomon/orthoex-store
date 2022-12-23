import Link from 'next/link';
import moreArrow from '@assets/new/icons/more-arrow.svg';
import IconText from '@components/IconText';

const ViewMoreLink: React.FC<{ href: string; text: string }> = ({
	href,
	text,
}) => (
	<Link href={href} legacyBehavior>
		<a
			style={{
				alignSelf: 'flex-end',
				textDecoration: 'underline',
				color: 'var(--oex-orange)',
				justifyContent: 'flex-end',
			}}>
			<IconText icon={moreArrow} text={text} />
		</a>
	</Link>
);

export default ViewMoreLink;
