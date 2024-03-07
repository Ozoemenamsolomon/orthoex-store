import Image from 'next/image';
import { schedulSession } from '../../data/rehabspace'; 
import BookingForm from './BookingForm'; 

const SchedulSession: React.FC = () => {
  return (
    <section className="section-padding ">
      <div id="booking" className="h-40"></div>
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <h3 className="font-semibold">{schedulSession?.heading}</h3>
          <p>{schedulSession?.description}</p>

          <BookingForm
            btnText={schedulSession?.btnText}
            apiErrorMessage={schedulSession?.errorMessage}
          />
        </div>

        {/* image */}
        <div className="w-full h-96 lg:h-96 rounded-3xl overflow-hidden bg-gray-300">
          <Image
            src={'/rehabspace/office-desk.jpg'}
            alt="session"
            width={500}
            height={600}
            className="imgcover"
          />
        </div>
      </div>
    </section>
  );
};

export default SchedulSession;
