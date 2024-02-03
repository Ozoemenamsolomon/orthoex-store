import React, { useEffect, useRef, useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';


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

  // const chartRef = useRef(null);

  // useEffect(() => {
  //   if (chartRef.current && statsState) {
  //     const data = {
  //       labels: [
  //         `Open Bookings ${openBookingRatio}%`,
  //         `Cancelled Bookings ${cancelledBookingRatio}%`,
  //         `Checked-In ${usedBookingRatio}%`,
  //       ],
  //       datasets: [
  //         {
  //           data: [openBookingRatio, cancelledBookingRatio, usedBookingRatio],
  //           backgroundColor: [
  //             'rgba(255, 165, 0, 0.7)',
  //             'rgba(255, 0, 0, 0.7)',
  //             'rgba(0, 128, 0, 0.7)',
  //           ],
  //           borderColor: ['rgba(255, 165, 0, 1)', 'rgba(255, 0, 0, 1)', 'rgba(0, 128, 0, 1)'],
  //           borderWidth: 1,
  //         },
  //       ],
  //     };

  //     const options = {
  //       cutout: '70%', // Adjust the size of the center hole
  //     };

  //     const newChart = new Chart(chartRef.current, {
  //       type: 'doughnut',
  //       data: data,
  //       options: options,
  //     });

  //     return () => {
  //       newChart.destroy();
  //     };
  //   }
  // }, [statsState]);

  const data = {
    labels: [
              `Open Bookings ${openBookingRatio}%`,
              `Cancelled Bookings ${cancelledBookingRatio}%`,
              `Checked-In ${usedBookingRatio}%`,
            ],
    datasets: [
      {
        label: '# of Votes',
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
      },
    ],
  };

  return (
    <div className="">
      <div className="relative">
        {/* <canvas ref={chartRef} style={{ height: '100px' }} /> */}

        <Doughnut data={data} />;
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h4> {appointmentCount}</h4>
          <p>Bookings</p>
          <p> {customersCount} Customers</p>
        </div>
      </div>
    </div>
  );
};

export default BookingStatusDoughnutChart;
