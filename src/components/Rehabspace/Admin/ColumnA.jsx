import { useEffect, useRef, useState } from 'react';
import {
	DoubleTick,
	FilterIcon,
	MapIcon,
	ScanIcon,
	SearchIcon,
	UserIcon,
} from '../../../data/rehabspace';
import { fetchAll, fetchWithPagination } from '@utils/rehabspcetable';
import PageLoading from "@components/Loader/PageLoading"
import BookingCountdown from './BookingCountdown';
import SearchBar from './SearchBar'
import {MdRefresh} from 'react-icons/md'

const ColumnA = ({ setToggle, toggle }) => {
	const loadingRef = useRef();
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(12);
	const [refresh, setRefresh] = useState('');
	


  
	useEffect(() => {
	  const fetchData = async () => {
		try {
			setLoading(true)
		  const { data, error } = await fetchWithPagination('appointment', start, end, 'id');
		  if (data) {
			setAppointments(prevData => [...prevData, ...(data || [])]);
			console.log('appointment', data)
			if(!toggle){
				setToggle(data?.[0]?.user)
			}
		  } else {
			toast.error('Cannot access customer table');
			setError(error?.message);
		  }
		} catch (error) {
		  console.error(error);
		} finally {
		  setLoading(false); 
		}
	  };
  
	  fetchData();
	
	}, [start, end, refresh]);

	return (
		<div className="border border-[var(--oex-light-grey)]">
			<h5 className="border-b border-[var(--oex-light-grey)]  px-4 py-6  ">
				Appointments
			</h5>

			<div className="flex items-center justify-between w-full gap-4 pt-6 px-4">
				<SearchBar setResult={setAppointments} setLoading={setLoading}/>
				<div className=" shrink-0 p">
					<FilterIcon />
					<div className="text-[12px] text-[var(--oex-dark-grey)]">View</div>
				</div>
			</div>

			<div className="flex justify-between items-center gap-2 px-4 pb-6 pt-2">
				<div className="flex items-center gap-2 pb-2">
					<UserIcon />
					<div className="text-[14px]">2/4 appointments listed in your view</div>
				</div>
				<button className="shadow-md p-1 rounded-full hover:border duration-300 ">
					<MdRefresh size={20} onClick={()=>setRefresh(new Date())}/>
				</button>
			</div>
			

			<div ref={loadingRef} className="h-[740px]  overflow-auto">
			{
			loading ? 
				<div  className="h-96 flex justify-center items-center">
					<PageLoading size={'96'} color={'border-orange-600'}/>
				</div>
				: 
				appointments?.length ?
				appointments?.map(({id, user, customerName, customerSurname, appointmentDateTime, customerType, locationName, }, i) => (
				<div
					key={i}
					onClick={()=>setToggle(user)}
					className={`${
						toggle?.id === id ? 'bg-[var(--oex-light-grey)]' : ''
					}  px-4 py-6 border-y border-[var(--oex-light-grey)] flex gap-2 justify-between items-center `}>

					<div className="flex gap-4">
						<div className="shrink-0 rounded-full h-14 w-14 flex justify-center items-center bg-[var(--oex-grey)] text-[var(--oex-off-white)] uppercase">
							{customerName?.[0]}{customerSurname?.[0] || customerName?.[1]}
						</div>

						<div className="">
							<h5 className="">{customerName} {customerSurname}</h5>
							<div className="flex gap-4 items-center  text-sm">
								<div className="text-[var(--oex-dark-grey)]">
									{new Date(appointmentDateTime).toDateString()}
								</div>
								<div className="p-1 bg-[var(--oex-orange-mute)] text-[var(--oex-orange)]">
									{new Date(appointmentDateTime).toLocaleTimeString()}
								</div>
							</div>
							<div className="flex gap-2 items-center text-[var(--oex-dark-grey)]">
								<MapIcon />
								<div className="text-sm">{locationName}</div>
								<UserIcon />
								<div className="text-sm">{customerType}</div>
							</div>
							<div className="flex gap-2 items-center text-[var(--oex-dark-grey)]"></div>
						</div>
					</div>

					<BookingCountdown bookingDate={appointmentDateTime}/>
				</div>
				
			))
			:
			<div className="h-80 flex justify-center items-center">
				<p>No customer data</p>
			</div>
		}

		{
			error ? <div className="h-80 flex justify-center items-center">
				<p>{error}</p>
			</div> : ''
		}

		</div>

			
		</div>
	);
};

export default ColumnA;
