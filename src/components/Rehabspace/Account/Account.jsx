import React from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { ClockIcon, MapIcon } from '../../../data/rehabspace'
import Calender from '../Calender'

const Account = () => {
  return (
    <div className='section-padding'>
        <div className="py-14">
            <div className="flex gap-4">
                <ClockIcon/>
                <div className="">80 min appointments</div>
            </div>
            <div className="flex gap-4">
                <MapIcon/>
                <div className="sm:w-80">2A, Musari Apena Street, Ewu-Titan, Off Labinjo Kalejaiye Street, Mafoluku, Oshodi, Lagos State.</div>
            </div>
        </div>

        {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-4 lg:gap-6 2xl:gap-14"> */}
        <div className="grid lg:flex lg:justify-between gap-14">
            <div className="lg:w-1/4">
                <Step1/>
            </div>
            <div className="lg:w-3/4 ">
                <Calender/>
            </div>
            
            {/* <Step3/> */}
        </div>
        
    </div>
  )
}

export default Account