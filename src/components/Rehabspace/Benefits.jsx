import { benefits } from "../../data/rehabspace"

const Benefits = () => {
  return (
    <section className='section-padding'>
        <div className="grid gap-10 md:grid-cols-2">
            <div className="">
                <h1 className='pb-8 font-semibold'>{benefits?.heading}</h1>
                <div className="space-y-2">
                    {
                        benefits?.benefitsList?.map(({id,icon,title,description})=>(
                            <div key={id} 
                            className="flex gap-4 items-start">
                                <div className="">{icon}</div>

                                <div className="">
                                    <h5 className="font-semibold">{title}</h5>
                                    <p className="text-[var(--oex-dark-grey)]">{description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* video */}
            <div className="w-full h-96 md:h-full rounded-3xl overflow-hidden bg-gray-300">
                

            </div>
        </div>
        
    </section>
  )
}

export default Benefits