import { DoubleTick, FilterIcon, MapIcon, ScanIcon, SearchIcon, UserIcon } from '../../../data/rehabspace'

const ColumnA = ({setToggle, toggle}) => {
  return (
    <div className='border border-[var(--oex-light-grey)]'>
      <h5 className="border-b border-[var(--oex-light-grey)]  px-4 py-6  ">
        Customer
      </h5>

      <div className="flex items-center justify-between w-full gap-4 pt-6 px-4">

          <form className='w-full p-3 bg-[var(--oex-lightest-grey)] rounded-full flex items-center  justify-between gap-2'>
            <div className="text-[var()]"><SearchIcon/></div>
            <input type="search" name="" id="" className='w-full bg-transparent focus:outline-none' placeholder='Search customers'/>
            <div className=" shrink-0 "><ScanIcon/></div>
          </form>

          <div className=" shrink-0 p">
            <FilterIcon/>
            <div className='text-[12px] text-[var(--oex-dark-grey)]'>View</div>
          </div>
      </div>

      <div className="flex items-center gap-2 px-4 pb-6 pt-2">
        <UserIcon/>
        <div className="text-[14px]">2/4 customers listed in your view</div>
      </div>

        {
            [1,2,3,4,5].map((item,i)=>(

                <div onClick={()=>setToggle(i)}  key={i} 
                className={`${toggle===i ? 'bg-[var(--oex-light-grey)]' : ''}  px-4 py-6 border-y border-[var(--oex-light-grey)]  hover-grey flex gap-2 justify-between items-center`}>
                  <div className="flex gap-4">
                    <div className="shrink-0 rounded-full h-14 w-14 flex justify-center items-center bg-[var(--oex-grey)] text-[var(--oex-off-white)]">
                      AI
                    </div>

                    <div className="">
                      <h5 className="">{'Abdur-rasheed Idris'}</h5>
                      <div className="flex gap-4 items-center  text-sm">
                          <div className="text-[var(--oex-dark-grey)]">{'17.Nov.2023 '}</div>
                          <div className="p-1 bg-[var(--oex-orange-mute)] text-[var(--oex-orange)]">{'11.00 AM'}</div>
                      </div>
                      <div className="flex gap-2 items-center text-[var(--oex-dark-grey)]">
                        <MapIcon/>
                        <div className="text-sm">{'Mafolloko'}</div>
                        <UserIcon/>
                        <div className="text-sm">{'Patient'}</div>
                      </div>
                      <div className="flex gap-2 items-center text-[var(--oex-dark-grey)]">
                        
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0  cursor-pointer ">
                    <DoubleTick/>
                    <div className='text-[12px] text-[var(--oex-dark-grey)]'>View</div>
                  </div>
                </div>
            ))
        }
    </div>
  )
}

export default ColumnA