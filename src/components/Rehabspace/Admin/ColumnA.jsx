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
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ColumnA = ({ setToggle, customer, setCustomerLog }) => {
	const loadingRef = useRef();
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(12);
	const [refresh, setRefresh] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [counting, setCounting] = useState({});

  
	useEffect(() => {
	  const fetchData = async () => {
		const pageSize = 12; 
		const offset = (currentPage - 1) * pageSize;
		try {
			setLoading(true)
		  const { data, error, count:{count, } } = await fetchWithPagination('appointment', offset, offset + pageSize - 1, 'id');

		  if (data) {
			setAppointments(data);
			console.log('appointment', data)
			if(!customer){
				setToggle(data?.[0]?.user)
			}
			setTotalPages(Math.ceil(count / pageSize));
			setCounting({total: count, result: data?.length})
			
		  } else {
			toast.error('Cannot access customer table');
			setError(error?.message);
		  }error
		} catch (error) {
		  console.error(error);
		} finally {
		  setLoading(false); 
		}
	  };
  
	  fetchData();
	
	}, [currentPage, refresh]);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
		  setCurrentPage((prevPage) => prevPage + 1);
		}
	  };
	
	  const handlePrevPage = () => {
		if (currentPage > 1) {
		  setCurrentPage((prevPage) => prevPage - 1);
		}
	  };

	return (
		<div className="border border-[var(--oex-light-grey)]">
			<h5 className="border-b border-[var(--oex-light-grey)]  px-4 py-6  ">
				Appointments
			</h5>

			<SearchBar setResult={setAppointments} setLoading={setLoading} setCounting={setCounting}/>

			<div className="flex justify-between items-center gap-2 px-4 pb-3 pt-2">
				<div className="flex items-center gap-2 ">
					<UserIcon />
					<div className="text-[14px]">{`${counting?.result || '' }/ ${counting?.total || ''}`} appointments listed in your view</div>
				</div>
			</div>

			<div className="flex px-4  pb-3 gap-8 justify-between">
				<button className="shadow-md p-1 rounded-full hover:border duration-300 ">
					<MdRefresh size={20} onClick={()=>setRefresh(new Date())}/>
				</button>
				<div className=" flex gap-3 justify-end">
					<button disabled={currentPage===1} onClick={handlePrevPage}
					className={`${currentPage===1 ? 'disabled cursor-not-allowed' : ''}`}><FaAngleLeft/></button>
					<span> Page {currentPage} of {totalPages} </span>
					<button disabled={currentPage===totalPages} onClick={handleNextPage}
					className={`${currentPage===totalPages ? 'disabled cursor-not-allowed' : ''}`}><FaAngleRight/></button>
				</div>
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
						customer?.id === id ? 'bg-[var(--oex-light-grey)]' : ''
					}  px-4 py-6 border-y border-[var(--oex-light-grey)] flex gap-2 justify-between items-center `}>

					<div className="flex gap-4">
						<div className="shrink-0 rounded-full h-10 w-10 flex justify-center items-center bg-[var(--oex-grey)] text-[var(--oex-off-white)] uppercase">
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

					<BookingCountdown bookingDate={appointmentDateTime} appointment={appointments[i]} setRefresh={setRefresh} setCustomerLog={setCustomerLog}/>
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
