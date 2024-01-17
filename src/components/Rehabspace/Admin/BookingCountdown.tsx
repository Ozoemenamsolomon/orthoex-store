import { DoubleTick } from '@data/rehabspace';
import React, { useMemo, useState, useEffect } from 'react';
import { TbChecks } from 'react-icons/tb';

interface BookingComponentProps {
  bookingDate: string;
}

const BookingCountdown: React.FC<BookingComponentProps> = ({ bookingDate }) => {
  const [isCancellationAllowed, setIsCancellationAllowed] = useState(true);
  const [countdownUi, setCountdownUi] = useState('');

  useEffect(() => {
    const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;

    const updateCountdown = () => {
      const currentTime = new Date().getTime();
      const bookingTime = new Date(bookingDate).getTime();
      const timeDifference = bookingTime - currentTime;

      const hours = Math.floor(timeDifference / (60 * 60 * 1000));
      const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

      if (timeDifference <= 0) {
        setIsCancellationAllowed(false);
        setCountdownUi('00:00:00');
      } else {
        setCountdownUi(`${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`);
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []); 

  const handleCancelBooking = () => {
    console.log('Booking canceled');
  };

  return (
    <div className='flex flex-col justify-between h-full items-center'>
        <button onClick={handleCancelBooking} disabled={!isCancellationAllowed} className={` p-2 shrink-0 flex flex-col items-center ${isCancellationAllowed ? 'hover:shadow-md duration-300' : 'cursor-not-allowed'}  `}>
            <div className={isCancellationAllowed ? 'text-orange-500' : 'text-[var(--oex-dark-grey)]'} > <TbChecks size={20}/> </div>
            <div className="text-[12px] text-[var(--oex-dark-grey)]">
                {
                    isCancellationAllowed ? 'check-in' : 'checked-in'
                }
            </div>
        </button>
      <p className='text-[10px] text-orange-500'>{countdownUi}</p>
    </div>
  );
};

export default BookingCountdown;
