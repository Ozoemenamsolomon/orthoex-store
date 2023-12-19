import { FaAngleLeft, FaAngleRight, } from 'react-icons/fa'

const Step3 = () => {
  return (
    <div>
        <div className="pb-8 flex justify-between">
            <h5>3 November 2023</h5>
            <div className="flex gap-4 text-xl items-center jusify-between">
                <button><FaAngleLeft/></button>                
                <button><FaAngleRight/></button>                
            </div>
        </div>

        <div className="space-y-4">
            <button className='text-center py-4 w-full bg-[var(--oex-lighter-grey)] rounded-md'>09:00 AM</button>
            <button className='text-center py-4 w-full bg-[var(--oex-lighter-grey)] rounded-md'>09:00 AM</button>
            <button className='text-center py-4 w-full bg-[var(--oex-lighter-grey)] rounded-md'>09:00 AM</button>
            <button className='text-center py-4 w-full bg-[var(--oex-orange-mute)] border border-[var(--oex-orange)]  rounded-md'>09:00 AM</button>
            <button className='text-center py-4 w-full bg-[var(--oex-lighter-grey)] rounded-md'>09:00 AM</button>
        </div>
    </div>
  )
}

export default Step3