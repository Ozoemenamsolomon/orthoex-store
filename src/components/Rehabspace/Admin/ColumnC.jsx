import React from 'react'

const ColumnC = () => {
  return (
    <div>
      <div className='border  md:w-[80vw] lg:w-full px-4 border-[var(--oex-light-grey)] rounded py-6 grid sm:grid-cols-2 gap-8 lg:grid-cols-1 md:col-span-2 lg:col-span-1 '>

          <div className="">
              <h5 className="font-medium">Bookings overview</h5>
              <div className="border rounded h-60 p-4"></div>
          </div>

          <div className="">
              <h5 className="font-medium">Bookings per day</h5>
              <div className="border rounded h-60 p-4"></div>
          </div>

          </div>
    </div>
  )
}

export default ColumnC