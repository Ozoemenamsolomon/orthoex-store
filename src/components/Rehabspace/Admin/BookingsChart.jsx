import React from 'react';
import { Bar } from 'react-chartjs-2';

const BookingsChart = () => {
	const data = {
		labels: [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday',
		],
		datasets: [
			{
				label: 'Bookings per Day',
				data: [12, 19, 3, 5, 2, 3, 8],
				backgroundColor: 'rgba(255, 165, 0, 0.7)',
				borderColor: 'rgba(255, 165, 0, 1)',
				borderWidth: 1,
				outerHeight: 24,
			},
		],
	};

	const options = {
		scales: {
			x: {
				grid: {
					display: false,
				},
				ticks: {
					color: 'rgba(255, 255, 255, 0.7)',
				},
			},
			y: {
				beginAtZero: true,
				grid: {
					color: 'rgba(255, 255, 255, 0.2)',
				},
				ticks: {
					color: 'rgba(255, 255, 255, 0.7)',
				},
			},
		},
	};

	return (
		<div className="w-full max-w-xl mx-auto mt-8">
			<Bar data={data} options={options} />
		</div>
	);
};

export default BookingsChart;
