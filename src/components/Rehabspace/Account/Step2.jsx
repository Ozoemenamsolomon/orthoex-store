import { FaAngleLeft, FaAngleRight, } from 'react-icons/fa'
import Calender from '../Calender'


const Step2 = () => {
  return (
    <div className='w-full'>
        {/* <div className="pb-8 flex justify-between">
            <h5>November 2023</h5>
            <div className="flex  gap-4 text-xl items-center jusify-between">
                <button><FaAngleLeft/></button>                
                <button><FaAngleRight/></button>              
            </div>
        </div> */}

        {/* <div className="h-96 border"> */}
          <Calender/>
        {/* </div> */}
    </div>
  )
}

export default Step2