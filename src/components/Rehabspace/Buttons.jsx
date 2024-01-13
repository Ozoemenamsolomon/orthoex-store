'use client';

import Link from 'next/link';

const BtnBasic = ({ href, text, onClick, className }) => {
	return (
		<button onClick={onClick} className={`px-8 py-4 font- rounded-md text-white bg-[var(--oex-orange)] ${className}` }>
			{href ? <Link
				href={href} className='w-full h-full '
				>
				{text}
			</Link> : 
			text
			}
		</button>
	);
};

export default BtnBasic;
