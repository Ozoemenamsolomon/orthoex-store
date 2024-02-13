import Image from 'next/image';
import { benefits,  } from '../../data/rehabspace';
import { FaPlayCircle } from 'react-icons/fa';
import React from 'react'; 


const Benefits: React.FC = () => {
  return (
    <section className="section-padding">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="pb-8 font-semibold">{benefits?.heading}</h1>
          <div className="space-y-2">
            {benefits?.benefitsList?.map(({ id, icon, title, description }) => (
              <div key={id} className="flex gap-4 items-start">
                <div>{icon}</div>

                <div>
                  <h5 className="font-semibold">{title}</h5>
                  <p className="text-[var(--oex-dark-grey)]">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* video */}
        <div className="w-full h-96 lg:h-full rounded-3xl overflow-hidden bg-gray-300 relative inset-0">
          <Image src={'/rehabspace/1.webp'} alt="benefits" layout="fill" objectFit="cover" />
          <div className="absolute inset-0 flex justify-center items-center font-bold text-6xl">
            <div className="bg-orange-500 p-6 rounded-full text-white">
              <FaPlayCircle />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
