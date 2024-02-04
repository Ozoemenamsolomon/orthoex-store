import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const BookingStatusDoughnutChart = ({ stats }) => {
  const [statsState, setStatsState] = useState(stats);

  useEffect(() => {
    setStatsState(stats);
  }, [stats]);

  const { appointmentCount, customersCount, openBookingRatio, cancelledBookingRatio, usedBookingRatio } =
    statsState || {};

  const data = {
    labels: [
              `Open Bookings ${openBookingRatio}%`,
              `Cancelled Bookings ${cancelledBookingRatio}%`,
              `Checked-In ${usedBookingRatio}%`,
            ],
    datasets: [
      {
        label: 'Appointment table',
        data: [openBookingRatio, cancelledBookingRatio, usedBookingRatio],
        backgroundColor: [

          'rgba(255, 206, 86, 0.4)',
          'rgba(0, 128, 0, 0.4)',
          'rgba(255, 159, 64, 0.4)',
        ],
        borderColor: [

          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
				weight: 20,
        hoverOffset: 4,

      },
    ],
   
  };

  return (
    <div className="">
      <div className="relative">

        <Doughnut data={data} width={300} height={300}/>
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h4> {appointmentCount}</h4>
          <div>Bookings</div>
          <div> {customersCount} Customers</div>
        </div>
      </div>
    </div>
  )
};

export default BookingStatusDoughnutChart;
