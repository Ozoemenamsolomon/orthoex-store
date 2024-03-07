import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import SessionBookingBtn from "@components/Rehabspace/Account/SessionBookingBtn"
import {
	add,
	eachDayOfInterval,
	endOfMonth,
	format,
	getDay,
	isEqual,
	isSameMonth,
	isToday,
	parse,
	isBefore,
	startOfToday,startOfDay,
} from 'date-fns';
import React, { useEffect, useState } from 'react';
import { supabaseClient } from '@utils/supabase';
import { CustomerType, Holiday, Location } from '@data/rehabspace/types';

function classNames(...classes: (string | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

interface CalendarProps {
    location: Location;
    setCustomer: React.Dispatch<React.SetStateAction<CustomerType | null>>;
    chosenLocation: Location;
    setChosenLocation: React.Dispatch<React.SetStateAction<Location>>;
    setBooking: React.Dispatch<React.SetStateAction<string | null>>;
    booking: string | null;
    customer: CustomerType | null;
    holidays: Holiday[];
}

const Calendar: React.FC<CalendarProps> = ({
    location,
    setCustomer,
    chosenLocation,
    setChosenLocation,
    setBooking,
    booking,
    customer,
    holidays,
}) => {

	let today = startOfToday();
	let [selectedDay, setSelectedDay] = useState<Date>(today);

	const [inactiveSlots, setInactiveSlots] = useState<Date[]>([])
	
	const [activeSlot, setActiveSlot] = useState<any>(null);
	const [active, setActive] = useState<number | null>(chosenLocation?.locationId || null)

	const isDayDisabled = (day: Date): boolean => {
		let newHolidayList = [];
		const dayOfWeek = new Date(day).getDay();
		// Disable Sunday if isSunday is not available
		if (dayOfWeek === 0 && !chosenLocation?.availableSunday) {
		  return true;
		}
		// Disable Saturday if isSaturday is not available
		if (dayOfWeek === 6 && !chosenLocation?.availableSaturday) {
		  return true;
		}
		// Disable days before today
		const startOfDayToCheck = startOfDay(day);
		if (isBefore(startOfDayToCheck, startOfToday())) {
			return true
		}
		// Disable the day if it exists in the holidays list
		// const holidays = ['2024-01-01', '2024-07-04', '2024-12-25'];
		newHolidayList = holidays?.map(item => {
			const originalDate = new Date(item?.date);
			originalDate.setDate(originalDate.getDate() - 1);
			return originalDate.toISOString().split('T')[0];
		  });
		  
		const formattedDay = new Date(day).toISOString().split('T')[0];
		if (newHolidayList?.includes(formattedDay)) {
		  return true;
		}

		return false;
	  };

	// mount booked slots for the selected date
	useEffect(() => {
		const handleInactiveSlots = async () => {
			try {
				// const { data, error } = await fetchRow('appointment', 'appointmentDate', format(selectedDay, 'EEE dd MMM yyyy', 'id'));
	
				// TODO: filter based on appointmentDate and location
				const { data, error } = await supabaseClient
					.from('appointment') 
					.select('*')  
					.ilike('locationName', `%${chosenLocation?.locationName}%`)
					.eq('appointmentDate', format(selectedDay, 'EEE dd MMM yyyy', 'id')) 
					// console.log({ data, error });
	
				if (data) {
					const bookingList = data.map(item => new Date(new Date(item?.appointmentDateTime).getTime() + 60 * 60 * 1000));
	
					setInactiveSlots(bookingList);
					// console.log('inactive slots', bookingList);
				} else {
					console.log({ data, error });
				}
			} catch (error) {
				console.error('Error fetching inactive slots:', error);
			}
		};
	
		handleInactiveSlots();
	}, [selectedDay, chosenLocation?.locationName]);
	
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
							location?.data?.map((item:any,i:any)=>
							<div key={i} className="">
								<button onClick={()=>{
									setActive(item?.locationId)
									setChosenLocation(item)
								}}  className={`${active===item?.locationId?'border-[var(--oex-orange)] bg-orange-50':''} border text-center   border-[var(--oex-grey)] px-4 py-2 rounded-md `}>
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
								disabled={isDayDisabled(day)}
								onClick={() => {
									setSelectedDay(day)
									setBooking(null)
									setActiveSlot(null)
								}}
								className={classNames(
									isEqual(day, selectedDay) && 'text-white',
									!isEqual(day, selectedDay) &&
										isToday(day) &&
										' font-bold',
									!isEqual(day, selectedDay) &&
										!isToday(day) &&
										isSameMonth(day, firstDayCurrentMonth) &&
										'text-gray-90',
									!isEqual(day, selectedDay) &&
									!isSameMonth(day, firstDayCurrentMonth) &&
										'text-gray-400',
									
									// isEqual(day, selectedDay) && isToday(day) && 'bg-orange-500',
									isEqual(day, selectedDay)  && 'bg-orange-500 ',
									!isEqual(day, selectedDay) && 'hover:bg-gray-200',
									isDayDisabled(day) && 'disabled text-gray-400 cursor-not-allowed',
									(isEqual(day, selectedDay) || isToday(day)) &&
										'font-bold',
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

					<TimeSlots chosenLocation={chosenLocation} date={selectedDay} activeSlot={activeSlot} setActiveSlot={setActiveSlot} setBooking={setBooking} inactiveSlots={inactiveSlots} />

					<SessionBookingBtn setCustomer={setCustomer} setInactiveSlots={setInactiveSlots} booking={booking} chosenLocation={chosenLocation} customer={customer}/>
				</ol>
			</div>

		</div>
	);
}
export default Calendar;

function generateTimeSlots(date:Date, numSlots:number, intervalMinutes:number, chosenLocation:Location) {
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

type TimeSlotpicker = {
	timeSlotsArray: {slot: string, date: Date}[]
	chosenLocation: Location;
	inactiveSlots: Date[]
	setBooking: React.Dispatch<React.SetStateAction<string | null>>; 
	activeSlot: any;
	setActiveSlot: React.Dispatch<React.SetStateAction<any>>;
  }

const TimeSlotPicker = ({ timeSlotsArray, setBooking, activeSlot, setActiveSlot, inactiveSlots, chosenLocation }: TimeSlotpicker) => {
	return (
	  <div className="flex flex-col gap-4 items-center">
		{timeSlotsArray.map((slot, index) => {
		  const isSlotInactive = inactiveSlots?.filter(inactiveSlot => {
			return (
			  inactiveSlot !== null &&
			  new Date(inactiveSlot).getTime() === new Date(slot?.date).getTime()
			);
			// check if the slot appeared 'maxBookingPerSlot' times in the inactiveSlot list.
		  }).length >= chosenLocation?.maxBookingPerSlot;

		  const isPastCurrentTime = () => {
			// console.log(new Date().getTime() > new Date(slot?.date).getTime(), new Date().getTime(),  new Date(slot?.date).getTime())
			return new Date().getTime() > new Date(slot?.date).getTime()  // booking time is past current time
		  }

		//   console.log(new Date(new Date().getTime() ), new Date(new Date(slot?.date).getTime() - 86400000), new Date().getTime() > new Date(slot?.date).getTime() - 86400000 )
  
		  return (
			<button
			  key={index}
			  disabled={isSlotInactive || isPastCurrentTime()}
			  className={`w-full text-center p-4 border rounded-md 
				${isSlotInactive || isPastCurrentTime() ? 'border-gray-300 hover:border-gray-300 text-gray-400 cursor-not-allowed' : activeSlot === index ? 'border-orange-500 bg-orange-50' : 'border-gray-700 hover:border-orange-500'}
				`}
			  onClick={() => {
				setActiveSlot(index);
				setBooking(new Date(slot?.date).toISOString());
			  }}
			>
			  {slot?.slot ? slot.slot : '...loading'}{isSlotInactive ? <span className='pl-2'>Slot booked</span>:''}
			</button>
		  );
		})}
	  </div>
	);
  };


 type Timeslots = {
	chosenLocation: Location;
	inactiveSlots: Date[]
	date: Date;
	setBooking: React.Dispatch<React.SetStateAction<string | null>>; 
	activeSlot: any;
	setActiveSlot: React.Dispatch<React.SetStateAction<any>>;
  }

const TimeSlots = ({chosenLocation, inactiveSlots, date, setBooking, activeSlot, setActiveSlot }:Timeslots) => {

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
		<div className="container mx-auto mt-8 ">
			<TimeSlotPicker timeSlotsArray={timeSlotsArray} activeSlot={activeSlot} setActiveSlot={setActiveSlot} setBooking={setBooking} inactiveSlots={inactiveSlots} chosenLocation={chosenLocation}/>
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