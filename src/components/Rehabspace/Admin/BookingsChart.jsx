import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import WeekDatePicker from './WeekDatePicker';

const BookingsChart = () => {
	const [list, setList] = useState([])

	const data = {
		labels: list?.map((item=>item?.day)),
		datasets: [
			{
				label: 'Bookings per Day',
				data: list?.map((item=>item?.value)),
				backgroundColor: 'rgba(255, 165, 0, 0.7)',
				borderColor: 'rgba(255, 165, 0, 1)',
				borderWidth: 1,
				outerHeight: 24,
			},
		],
	};

	return (
		<div className="w-full max-w-xl mx-auto mt-8 space-y-4">
			<div className="flex justify-end"><WeekDatePicker setData={setList} /></div>
			<Line data={data} width={800} height={600} />
		</div>
	);
};

export default BookingsChart;
