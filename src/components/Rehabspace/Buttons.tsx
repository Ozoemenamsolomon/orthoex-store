'use client';

import Link from 'next/link';
import { FC, MouseEventHandler } from 'react';

interface BtnBasicProps {
  href?: string;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const BtnBasic: FC<BtnBasicProps> = ({ href, text, onClick, className }) => {
  return (
    <button onClick={onClick} className={`px-8 py-4 rounded-md text-white bg-[var(--oex-orange)] ${className}`}>
      {href ? (
        <Link href={href} className="w-full h-full">
          {text}
        </Link>
      ) : (
        text
      )}
    </button>
  );
};

export default BtnBasic;
