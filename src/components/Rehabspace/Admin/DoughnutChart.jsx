// components/BookingStatusDoughnutChart.js
import React, { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BookingStatusDoughnutChart = () => {
	const chartRef = useRef(null);

	useEffect(() => {
		if (chartRef.current) {
			const data = {
				labels: ['Open Bookings', 'Cancelled Bookings', 'Checked-In'],
				datasets: [
					{
						data: [50, 30, 20],
						backgroundColor: [
							'rgba(255, 165, 0, 0.7)',
							'rgba(255, 0, 0, 0.7)',
							'rgba(0, 128, 0, 0.7)',
						],
						borderColor: [
							'rgba(255, 165, 0, 1)',
							'rgba(255, 0, 0, 1)',
							'rgba(0, 128, 0, 1)',
						],
						borderWidth: 1,
					},
				],
			};

			const options = {
				cutout: '70%', // Adjust the size of the center hole
			};

			const newChart = new Chart(chartRef.current, {
				type: 'doughnut',
				data: data,
				options: options,
			});

			return () => {
				newChart.destroy();
			};
		}
	}, []); // Empty dependency array to ensure this effect runs only once

	return <canvas ref={chartRef} style={{ height: '300px' }} />; // Set your desired height
};

export default BookingStatusDoughnutChart;
