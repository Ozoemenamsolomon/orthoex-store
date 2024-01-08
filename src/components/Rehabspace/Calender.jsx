import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import SessionBookingBtn from "@components/Rehabspace/Account/SessionBookingBtn"
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
import { fetchRow } from '@utils/rehabspcetable';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Calender({location, chosenLocation, setChosenLocation, setBooking,booking, customer }) {

	let today = startOfToday();
	let [selectedDay, setSelectedDay] = useState(today);

	const [inactiveSlots, setInactiveSlots] = useState([])
	
	const [selectedSlot, setSelectedSlot] = useState(null);
	const [active, setActive] = useState(chosenLocation?.locationId)

	// mount booked slots for the selected date
	useEffect(() => {
	const handleInactiveSlots = async () => {
		const {data, error} = await fetchRow('appointment', 'appointmentDate', format(selectedDay, 'EEE dd MMM yyyy'))
		if (data) {
			const bookingList = data?.map(item => {
				  return item?.appointmentDateTime
				} 
			)

			setInactiveSlots(bookingList)
			console.log('inactive slots', bookingList,)
		} else {
			console.log({data, error})
		}
		}
	handleInactiveSlots()
	}, [selectedDay])


	let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
	let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

	let days = eachDayOfInterval({
		start: firstDayCurrentMonth,
		end: endOfMonth(firstDayCurrentMonth),
	});

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
							location?.data?.map((item,i)=>
							<div key={i} className="">
								<button onClick={()=>{
									setActive(item?.locationId)
									setChosenLocation(item)
								}}  className={`${active===item?.locationId?'border-[var(--oex-orange)]':''} border text-center border-[var(--oex-grey)] px-4 py-2 rounded-md `}>
								{item?.locationName}
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
					{days.map((day, dayIdx) => {
						
						return <div
							key={day.toString()}
							className={classNames(
								dayIdx === 0 && colStartClasses[getDay(day)],
								'py-1.5',
							)}>
							<button
								type="button"
								onClick={() => {
									setSelectedDay(day)
									setBooking('')
									setSelectedSlot('')
								}}
								className={classNames(
									isEqual(day, selectedDay) && 'text-white',
									!isEqual(day, selectedDay) &&
										isToday(day) &&
										' font-semibold',
									!isEqual(day, selectedDay) &&
										!isToday(day) &&
										isSameMonth(day, firstDayCurrentMonth) &&
										'text-gray-90',
									!isEqual(day, selectedDay) &&
									    // appointmentDate:  booking,
    // appointmentStartTime1 :  new Date(booking).toLocaleTimeString(),	!isToday(day) &&
										!isSameMonth(day, firstDayCurrentMonth) &&
										'text-gray-400',
									// isEqual(day, selectedDay) && isToday(day) && 'bg-orange-500',
									isEqual(day, selectedDay)  && 'bg-orange-500 ',
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
					})}
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
				<ol className="mt-4 space-y-4 text- leading-6 text-gray-500 ">

					<TimeSlots chosenLocation={chosenLocation} date={selectedDay} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} setBooking={setBooking} inactiveSlots={inactiveSlots} />

					<SessionBookingBtn setInactiveSlots={setInactiveSlots} booking={booking} chosenLocation={chosenLocation} customer={customer}/>
				</ol>
			</div>

		</div>
	);
}

function generateTimeSlots(date, numSlots, intervalMinutes, chosenLocation) {
	const timeSlots = [];
	let currentDate = new Date(date); // Use the provided date

	for (let i = 0; i < numSlots; i++) {
		const endTime = new Date(currentDate);
		endTime.setMinutes(currentDate.getMinutes() + intervalMinutes ); // Calculate end time

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

		currentDate.setMinutes(currentDate.getMinutes() + intervalMinutes + chosenLocation?.breakBetweenSlots); // Increment by intervalMinutes + breakBetweenSlots
	}

	return timeSlots;
}

const TimeSlotPicker = ({ timeSlots, setBooking, selectedSlot, setSelectedSlot, inactiveSlots }) => {
	return (
	  <div className="flex flex-col gap-4 items-center">
		{timeSlots.map((slot, index) => {
		  const isSlotInactive = inactiveSlots?.some(inactiveSlot => {
			if (inactiveSlot === null) {
			  return false; // Skip null values
			}
		  
			// Convert the inactiveSlot to the desired format
			const formattedInactiveSlot = `${new Date(inactiveSlot).getFullYear()}-${(new Date(inactiveSlot).getMonth() + 1).toString().padStart(2, '0')}-${new Date(inactiveSlot).getDate().toString().padStart(2, '0')}T${new Date(inactiveSlot).getHours().toString().padStart(2, '0')}:${new Date(inactiveSlot).getMinutes().toString().padStart(2, '0')}:${new Date(inactiveSlot).getSeconds().toString().padStart(2, '0')}`;
		  
			// Convert the slot.date to the desired format
			const formattedSlotDate = `${new Date(slot.date).getFullYear()}-${(new Date(slot.date).getMonth() + 1).toString().padStart(2, '0')}-${new Date(slot.date).getDate().toString().padStart(2, '0')}T${new Date(slot.date).getHours().toString().padStart(2, '0')}:${new Date(slot.date).getMinutes().toString().padStart(2, '0')}:${new Date(slot.date).getSeconds().toString().padStart(2, '0')}`;
		  console.log(formattedInactiveSlot, formattedSlotDate)
			return formattedInactiveSlot === formattedSlotDate;
		  });
		  
  
		  selectedSlot === index && console.log(slot, 'conditional===', isSlotInactive, '===', new Date(slot.date).toISOString());
  
		  return (
			<button
			  key={index}
			  disabled={isSlotInactive}
			  className={`w-full text-center p-4 border  rounded-md 
				${
				  isSlotInactive ? 'border-green-500 cursor-not-allowed' : selectedSlot === index ? 'border-orange-500' : 'border-gray-300'
				}
				hover:border-orange-500`}
			  onClick={() => {
				setSelectedSlot(index);
				setBooking(new Date(slot?.date).toISOString());
			  }}
			>
			  {slot.slot}
			</button>
		  );
		})}
	  </div>
	);
  };
  

const TimeSlots = ({chosenLocation, inactiveSlots, date, setBooking, selectedSlot, setSelectedSlot }) => {
	const [startTime, setstartTime] = useState(new Date(chosenLocation?.startTime));
	
	useEffect(() => {
		// Assuming startTime is a string like "08:00:00+01"
		const [hours, minutes, seconds] = chosenLocation?.startTime?.split(':');
		const timezoneOffset = parseInt(chosenLocation?.startTime?.slice(-3), 10);
		
		// Create a new date object with the same date as the original and set the hours
		const updatedDate = new Date(date);
		updatedDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10), 0);
		
		// Adjust for the timezone offset
		updatedDate.setHours(updatedDate.getHours() + timezoneOffset / 60);
		// updatedDate.setHours(updatedDate.getHours() - timezoneOffset / 60);
		
		setstartTime(updatedDate);
	  }, [date, chosenLocation?.startTime]);
	  
	const numSlots = chosenLocation?.totalSlotsPerDay; // Number of slots
	const interval = chosenLocation?.bookingDuration; // Interval in minutes
	const timeSlotsArray = generateTimeSlots(startTime, numSlots, interval, chosenLocation);
	return (
		<div className="container mx-auto mt-8 pr-">
			<TimeSlotPicker timeSlots={timeSlotsArray} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} setBooking={setBooking} inactiveSlots={inactiveSlots}/>
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
