import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import {
	add,
	eachDayOfInterval,
	endOfMonth,
	format,
	getDay,
	isEqual,
	isSameDay,
	isSameMonth,
	isToday,
	parse,
	parseISO,
	startOfToday,
} from 'date-fns';
import { Fragment, useEffect, useState } from 'react';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Calender({ setBooking }) {
	const [active, setActive] = useState(1)


	let today = startOfToday();
	let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
	let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

	let days = eachDayOfInterval({
		start: firstDayCurrentMonth,
		end: endOfMonth(firstDayCurrentMonth),
	});

	let [selectedDay, setSelectedDay] = useState(today);
	function previousMonth() {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
		setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
	}

	function nextMonth() {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
		setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
	}

	function previousDay() {
		const previousDay = add(selectedDay, { days: -1 });
		setSelectedDay(previousDay);
		setCurrentMonth(format(previousDay, 'MMM-yyyy'));
	}

	function nextDay() {
		const nextDay = add(selectedDay, { days: 1 });
		setSelectedDay(nextDay);
		setCurrentMonth(format(nextDay, 'MMM-yyyy'));
	}

	return (
		<div className="flex justify-between gap-12  flex-wrap ">

			<div className="max-xl:w-full">
					<h5 className="pb-8">Select location</h5>
					<div className="flex flex-wrap gap-6">
						{
							[1,2,3]?.map((item,i)=>
							<div key={i} className="">
								<button onClick={()=>{
									setActive(i)
								}}  className={`${active===i?'border-[var(--oex-orange)]':''} border text-center border-[var(--oex-grey)] px-4 py-2 rounded-md `}>
								Mafoluku
								</button>
							</div>
							)
						}
					</div>
			</div>

			<div className=" w-full md:w-80 ">
				<div className="flex items-center">
					<h5 className="flex-auto ">
						{format(firstDayCurrentMonth, 'MMMM yyyy')}
					</h5>
					<button
						type="button"
						onClick={previousMonth}
						className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
						<span className="sr-only">Previous month</span>
						<FaAngleLeft className="w-5 h-5" aria-hidden="true" />
					</button>
					<button
						onClick={nextMonth}
						type="button"
						className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
						<span className="sr-only">Next month</span>
						<FaAngleRight className="w-5 h-5" aria-hidden="true" />
					</button>
				</div>

				<div className=" grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
					<div>S</div>
					<div>M</div>
					<div>T</div>
					<div>W</div>
					<div>T</div>
					<div>F</div>
					<div>S</div>
				</div>

				<div className="grid grid-cols-7 mt-2 text-sm">
					{days.map((day, dayIdx) => (
						<div
							key={day.toString()}
							className={classNames(
								dayIdx === 0 && colStartClasses[getDay(day)],
								'py-1.5',
							)}>
							<button
								type="button"
								onClick={() => setSelectedDay(day)}
								className={classNames(
									isEqual(day, selectedDay) && 'text-white',
									!isEqual(day, selectedDay) &&
										isToday(day) &&
										'text-orange- font-semibold',
									!isEqual(day, selectedDay) &&
										!isToday(day) &&
										isSameMonth(day, firstDayCurrentMonth) &&
										'text-gray-90',
									!isEqual(day, selectedDay) &&
										!isToday(day) &&
										!isSameMonth(day, firstDayCurrentMonth) &&
										'text-gray-400',
									isEqual(day, selectedDay) && isToday(day) && 'bg-orange-500',
									isEqual(day, selectedDay) && !isToday(day) && 'bg-orange-500 ',
									!isEqual(day, selectedDay) && 'hover:bg-gray-200',
									(isEqual(day, selectedDay) || isToday(day)) &&
										'font-semibold',
									'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
								)}>
								<time dateTime={format(day, 'yyyy-MM-dd')}>
									{format(day, 'd')}
								</time>
							</button>
						</div>
					))}
				</div>
			</div>

			<div className="w-full md:w-80 ">
				<div className="flex justify-between items-center ">
					<h5 className="">
						Schedule for{' '}
						<time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
							{format(selectedDay, 'MMM dd, yyy')}
						</time>
					</h5>
					<div className="flex">
						<button
							type="button"
							onClick={previousDay}
							className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
							<span className="sr-only">Previous month</span>
							<FaAngleLeft className="w-5 h-5" aria-hidden="true" />
						</button>
						<button
							onClick={nextDay}
							type="button"
							className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
							<span className="sr-only">Next month</span>
							<FaAngleRight className="w-5 h-5" aria-hidden="true" />
						</button>
					</div>
				</div>
				<ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
					<TimeSlots date={selectedDay} setBooking={setBooking} />
				</ol>
			</div>

		</div>
	);
}

function generateTimeSlots(date, numSlots, intervalMinutes) {
	const timeSlots = [];
	let currentDate = new Date(date); // Use the provided date

	for (let i = 0; i < numSlots; i++) {
		const endTime = new Date(currentDate);
		endTime.setMinutes(currentDate.getMinutes() + intervalMinutes); // Calculate end time

		const formattedSlot = `${currentDate.toLocaleTimeString([], {
			hour: 'numeric',
			minute: '2-digit',
		})} - ${endTime.toLocaleTimeString([], {
			hour: 'numeric',
			minute: '2-digit',
		})}`;

		const slotObject = {
			slot: formattedSlot,
			date: new Date(currentDate), // Clone the date object
		};

		timeSlots.push(slotObject);

		currentDate.setMinutes(currentDate.getMinutes() + intervalMinutes); // Increment by 90 minutes
	}

	return timeSlots;
}

const TimeSlotPicker = ({ timeSlots, setBooking }) => {
	const [selectedSlot, setSelectedSlot] = useState(null);

	return (
		<div className="flex flex-col gap-4 items-center">
			{timeSlots.map((slot, index) => (
				<button
					key={index}
					className={`w-full text-center p-4 border  rounded-md ${
						selectedSlot === index ? 'border-orange-500' : 'border-gray-300'
					} hover:border-orange-500`}
					onClick={() => {
						setSelectedSlot(index);
						setBooking(new Date(slot?.date).toLocaleString());
					}}>
					{slot.slot}
				</button>
			))}
		</div>
	);
};

const TimeSlots = ({ date, setBooking }) => {
	const [startTime, setstartTime] = useState(new Date());
	useEffect(() => {
		setstartTime(date.setHours(9, 0, 0, 0));
	}, [date]);
	const numSlots = 6; // Number of slots
	const interval = 90; // Interval in minutes
	const timeSlotsArray = generateTimeSlots(startTime, numSlots, interval);
	return (
		<div className="container mx-auto mt-8 pr-8">
			<TimeSlotPicker timeSlots={timeSlotsArray} setBooking={setBooking} />
		</div>
	);
};

let colStartClasses = [
	'',
	'col-start-2',
	'col-start-3',
	'col-start-4',
	'col-start-5',
	'col-start-6',
	'col-start-7',
];
