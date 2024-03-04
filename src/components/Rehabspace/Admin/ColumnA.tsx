import React, { useEffect, useRef, useState } from 'react';
import {
  MapIcon,
  UserIcon,
} from '../../../data/rehabspace';
import { deleteItem, fetchWithPagination } from '@utils/rehabspcetable';
import PageLoading from '../../Loader/PageLoading'
import BookingCountdown from './BookingCountdown';
import SearchBar from './SearchBar';
import {MdRefresh} from 'react-icons/md'
import { FaAngleLeft, FaAngleRight, FaTimes,  } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { stringToJson } from '@utils/stringToJson';
import { useRouter } from 'next/router';
import { Appointment, CustomerType,  } from '@data/rehabspace/types'; 
import { formatAMPM } from '@utils/fromatTime';

type ColumnAProps = {
  rehabspaceData: any;
  updateCustomer: (customer: string) => void;
  setToggle: React.Dispatch<React.SetStateAction<any>>;
  toggle: any;
  customer: CustomerType | string | null;
  setCustomerLog: React.Dispatch<React.SetStateAction<any>>;
  appointmentTable: Appointment[];
  setAppointmentTable: React.Dispatch<React.SetStateAction<Appointment[]>>;
};

const ColumnA: React.FC<ColumnAProps> = ({
  rehabspaceData,
  updateCustomer,
  setToggle,
  toggle,
  customer,
  setCustomerLog,
  appointmentTable,
  setAppointmentTable,
}) => {
  const loadingRef = useRef<HTMLDivElement>(null); // Ref type specified
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [counting, setCounting] = useState<{ total: number; result: number }>({ total: 0, result: 0 });
  const [queryParams, setQueryParams] = useState<{ date: any; customerName: string; customerType: string; status: string; location: string; search: string } | {}>({
    date: '',
    customerName: '',
    customerType: '',
    status: '',
    location: '',
    search: '',
  });

  let pageSize = rehabspaceData?.pageSize || 10;

  const updatePagination = (counts: number, type: string | null, data: Appointment[] | null) => {
    if (!type) {
      setTotalPages(Math.ceil(counts / pageSize));
      setCounting({ total: counts, result: data?.length || 0 });
    } else {
      setCounting({ total: counts, result: data?.length || 0 });
      setCurrentPage(1);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    setTotalPages(Math.ceil(rehabspaceData?.appointments?.count?.count / pageSize));
    setCounting({ total: rehabspaceData?.appointments?.count?.count || 0, result: appointmentTable?.length || 0 });
  }, [rehabspaceData, pageSize, appointmentTable]);

  const fetchAppointments = async (currentPage: number) => {
    const offset = (currentPage - 1) * pageSize;
    try {
      setError(null);
      setLoading(true);
      const { data, error, count } = await fetchWithPagination('appointment', offset, offset + pageSize - 1, 'id');

      if (data) {
        setAppointmentTable(data);

        if (!customer) {
          updateCustomer(stringToJson(data?.[0]?.user));
          setToggle(data?.[0]?.id);
        } else {
          updateCustomer(stringToJson(customer));
          if (!toggle) {
            setToggle(data?.[0]?.id);
          }
        }
        updatePagination(count, null, data);
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

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      fetchAppointments(currentPage + 1);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      fetchAppointments(currentPage - 1);
    }
  };

  useEffect(() => {
    if (router.query.date) {
      fetchAppointments(currentPage);
    }
  }, [router.query.date]);

  const handleRefresh = async (clearSearch: () => void) => {
    await setQueryParams({});
    await router.replace({
      pathname: router.pathname,
      query: '',
    });
    if (typeof clearSearch === 'function') {
      clearSearch();
    }
    fetchAppointments(currentPage);
  };
  return (
    <div className="border-x border-[var(--oex-light-grey)] py-8 h-screen overflow-auto">
      <div>
          <h5 className="border-b border-[var(--oex-light-grey)]  px-4 pb-6  ">Appointments</h5>

          <SearchBar queryParams={queryParams} setQueryParams={setQueryParams} setLoading={setLoading} setAppointmentTable={setAppointmentTable} updatePagination={updatePagination} 
          />

          <div className="flex justify-between items-center gap-2 px-4 pb-3 pt-2">
            <div className="flex items-center gap-2 ">
              
                <UserIcon />
                <div className="text-[14px]">{`${counting?.result || 0 }/ ${counting?.total || ''}`} appointments listed in your view</div>
              
            </div>
          </div>

          <div className="flex px-4  pb-3 gap-8 justify-between">
            <button className="shadow-md p-1 rounded-full hover:shadow-lg duration-300 ">
              <MdRefresh size={20} onClick={handleRefresh}/>
            </button>
            <div className=" flex gap-3 justify-end">
              {
                totalPages && totalPages !== 0 ? 
                <>
                  <button disabled={currentPage===1} onClick={handlePrevPage}
                  className={`${currentPage===1 ? 'disabled cursor-not-allowed text-gray-200' : ''}`}><FaAngleLeft/></button>
                  <span> Page {currentPage} of {totalPages} </span>

                  <button disabled={currentPage===totalPages} onClick={handleNextPage}
                  className={`${currentPage===totalPages ? 'disabled cursor-not-allowed text-gray-200' : ''}`}><FaAngleRight/></button>
                </>
                : null
              }
            </div>
          </div>
      </div>

			<div ref={loadingRef} className="border-t border-gray-100 ">
			{
			loading ? 
				<div  className="h-96 flex justify-center items-center">
					<PageLoading />
				</div>
				: 
				appointmentTable?.length ?
				appointmentTable?.map(({id, user, customerName, customerSurname, AppointmentStartTime,  appointmentDateTime, customerType, appointmentDate, locationName, }, i) => (
				<div 
					key={i}
					onClick={()=>{
						updateCustomer(user)
						setToggle(id)
					}}
					className={`${
						toggle === id ? 'bg-[var(--oex-light-grey)]' : ''
					} ${i===appointmentTable?.length-1 ? '' : 'border-[var(--oex-light-grey)]  border-b'}  px-4 py-6 flex gap-2 justify-between items-center `}>

					<div className="flex gap-4">
						<div className="shrink-0 rounded-full h-10 w-10 flex justify-center items-center bg-[var(--oex-grey)] text-[var(--oex-off-white)] uppercase">
							{customerName?.[0]}{customerSurname?.[0] || customerName?.[1]}
						</div>

						<div className="">
							<h5 className="">{customerName} {customerSurname}</h5>
							<div className="flex gap-4 items-center  text-sm">
								<div className="text-[var(--oex-dark-grey)]">
									{new Date(appointmentDate).toDateString()}
								</div>
								<div className="p-1 ">
									{formatAMPM(AppointmentStartTime)}
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

					{/* <FaTimes size={16} onClick={()=>deleteItem('appointment', 'id', appointmentTable[i]?.id)} /> */}

					<BookingCountdown bookingDate={appointmentDateTime} appointment={appointmentTable[i]} appointmentTable={appointmentTable} setAppointmentTable={setAppointmentTable}  index={i} setCustomerLog={setCustomerLog}/>
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
