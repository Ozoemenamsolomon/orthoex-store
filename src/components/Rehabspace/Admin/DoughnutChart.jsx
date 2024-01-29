// components/BookingStatusDoughnutChart.js
import React, { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BookingStatusDoughnutChart = ({rehabspaceData}) => {
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

	return <div className="">
		<div className="relative">
			<canvas ref={chartRef} style={{ height: '100px' }} />
			<div className="absolute inset-0 flex flex-col justify-center items-center">
				<h4> {rehabspaceData?.stats?.appointmentCount?.count}</h4>
				<p>Bookings</p>
				<p > {rehabspaceData?.stats?.customersCount?.count} Customers</p>
			</div>
		</div>
		
		
		</div>; // Set your desired height
};

export default BookingStatusDoughnutChart;