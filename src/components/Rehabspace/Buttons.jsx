'use client'

import Link from 'next/link'


const BtnBasic = ({href, text}) => {

  return (
    <div className="flex">
      <Link href={href} className={`px-8 py-4 font- rounded-md text-white bg-[var(--oex-orange)] hover:bg-[var(--oex-orange-dark)] duration-300`} >
        {text}
      </Link>
    </div>

  )
}

export default BtnBasic