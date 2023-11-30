import React, { useState } from 'react'
import ColumnA from './ColumnA'
import ColumnB from './ColumnB'
import ColumnC from './ColumnC'

const RehabSpaceAdmin = () => {
    const [toggle, setToggle] = useState(false)
  return (
    <main className='mx-auto  max-w-[1500px] max-md:px-[1rem] px-[4rem] h-screen overflow-auto'>
      

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="md:grid hidden">
                <ColumnA setToggle={setToggle} toggle={toggle}/>
            </div>
            <div className="md:hidden">
            {!toggle ? <ColumnA setToggle={setToggle} toggle={toggle}/> :
                <div className="md:hidden">
                    <ColumnB type={'a'} toggle={toggle} setToggle={setToggle}/>
                </div>
            }
            </div>
            

            <div className="md:grid hidden">
                <ColumnB toggle={toggle} setToggle={setToggle}/>
            </div>
            
            <ColumnC/>
        </div>
        
    </main>
  )
}

export default RehabSpaceAdmin