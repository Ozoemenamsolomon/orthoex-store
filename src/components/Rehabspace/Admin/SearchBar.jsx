import { useEffect, useRef, useState } from 'react';
import {supabaseClient} from '../../../utils/supabase'
import {
	DoubleTick,
	FilterIcon,
	MapIcon,
	ScanIcon,
	SearchIcon,
	UserIcon,
} from '../../../data/rehabspace';
import {useClickOutside} from '@utils/useClickOutside'
import { FaCalendarAlt, FaCalendarWeek, FaMapPin, FaRegClock, FaTimes, FaUserAlt } from 'react-icons/fa';
import { MdCheckCircleOutline } from 'react-icons/md';
import { tableLength } from '@utils/rehabspcetable';
import { useRouter } from 'next/router';
import CustomDatePicker from '../CustomDatePicker';
import {format,} from 'date-fns';

const SearchBar = ({ handleRefresh, queryParams, setQueryParams, setLoading, setCounting, pageSize,  updatePagination, offset, setAppointmentTable }) => {
  const router = useRouter()
  const dropdown = useRef(null)
  const dropdown1 = useRef(null)
  const dropdown2 = useRef(null)
  const dropdown3 = useRef(null)
  const [searchTerm, setSearchTerm] = useState('');
  

  const [show, setShow] = useState('')
  const [drop, setDrop] = useState('')

  const handleModal = async (type,) => {
    if (type===show){
      setShow('')
    } else {
      setShow(type)
    }
  };

  useClickOutside(dropdown, ()=>handleModal('location'))
  useClickOutside(dropdown1, ()=>handleModal('customerType'))
  useClickOutside(dropdown2, ()=>handleModal('date'))
  useClickOutside(dropdown3, ()=>handleModal('status'))

  const updateQuery = (query, value, e) => {
    if(e){
      e.preventDefault()
    }
    setLoading((true))

    handleModal('')
    setQueryParams((prevParams) => ({
      ...prevParams,
      [query]: value,
      
    }));
  
    router.replace({
      pathname: router.pathname,
      query: {
        ...queryParams,
        [query]: value,
        search: '1'
      },
    });
  };

  const clear = () => {
    setQueryParams({})
    router.replace({
      pathname: router.pathname,
      query: ''
    });
    setDrop(prev=>!prev)
    setShow('')
  }
  
  useEffect(() => {
    const searchTable = async () => {
      if (router.query.search) {
        const { location, customerName, date, status, customerType } = router.query;
        const { count } = await tableLength('appointment');
  
        try {
          setLoading(true);
  
          let query = supabaseClient.from('appointment').select('*');
  
          if (location) {
            query = query.ilike('locationName', `%${location}%`);
          }
  
          if (customerName) {
            query = query.ilike('customerName', `%${customerName}%`);
          }
  
          if (customerType) {
            query = query.ilike('customerType', `%${customerType}%`);
          }

          if (date) {
            query = query.eq('appointmentDate', new Date(date).toISOString())
          }
  
          if (status) {
            query = query.eq('status->>status', status);
          }
  
          const result = await query;
          console.log(result);
  
          if (result?.data) {
            setAppointmentTable(result?.data);
            updatePagination(count, 'search', result?.data);
          } else {
            console.error(result?.error);
            setAppointmentTable([]);
            updatePagination(count, 'search', []);
          }
        } catch (error) {
          console.error(error);
          setAppointmentTable([]);
          updatePagination(count, 'search', []);
        } finally {
          setLoading(false);
        }
      }
    };
  
    searchTable();
  }, [router.query]);
  

  return (
    <div>
        <div className="flex items-center justify-between w-full gap-4 pt-6 px-4">
          <form className="w-full p-3 bg-[var(--oex-lightest-grey)] rounded-full flex items-center justify-between gap-2">
            <div className="text-[var()]">
              <button onClick={(e)=>updateQuery( 'customerName', searchTerm, e)}>
                <SearchIcon />
              </button>
            </div>
            <input
              type="search"
              name=""
              id=""
              className="w-full bg-transparent focus:outline-none"
              placeholder="Search appointments"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="shrink-0">
              <ScanIcon />
            </div>
          </form>
          
          <div className="relative shrink-0 p">
              <button onClick={()=>clear()}>
                  <FilterIcon />
              </button>
              <div className="text-[12px] text-[var(--oex-dark-grey)]">View</div>
          </div>
        </div>

        <div className={` ${drop || show==='customerName' ? 'scale-y-100 py-3 px-4' : 'hidden'}   transform transition-all duration-500 space-y-2`}>
          <div className={`flex items-center justify-between`}>
              <div className="relative  border-r pr-3">
                <button onClick={()=>handleModal('location', )} className='flex gap-1 items-center'>
                  <MapIcon/> <span>Location</span>
                </button>

                {show==='location'&&<div ref={dropdown} className="absolute border bg-white p-4 top-8 left-0">
                  {
                    ['Mafoluku', 'Ikorodu'].map((e,i)=>(
                      <button key={i}  onClick={()=>updateQuery( 'location', e)}  className='p-1 hover:border duration-300'>{e}</button>
                    ))
                  }
                </div>}
              </div>

              <div className="relative border-r pr-3">
                <button onClick={()=>handleModal('customerType')} className='flex gap-1 items-center'>
                  <UserIcon/> <span>Customer type</span>
                </button>

                {show==='customerType'&&<div  ref={dropdown1} className="absolute border bg-white p-4 top-8 left-0">
                  {
                    ['Clinician', 'Patient'].map((e,i)=>(
                      <button key={i}  onClick={()=>updateQuery( 'customerType',e)} className='p-1 hover:border duration-300'>{e}</button>
                    ))
                  }
                </div>
                }
              </div>

              <div className="relative  border-r pr-3">
                <button  onClick={()=>handleModal('date')} className='flex gap-1 items-center'>
                  <FaCalendarAlt/> <span>Date</span>
                </button >

                {show==='date'&&
                <div ref={dropdown2}  className="absolute  bg-white top-8 -left-20">

                    <CustomDatePicker onChange={(date) => updateQuery('date', date)} />

                  {/* <input onChange={(e=>updateQuery('date',e.target.value, e))} type="date" name="datepicker" id="datepicker"/> */}
                </div>}
              </div>

              <div  className="relative  ">
                <button onClick={()=>handleModal('status')} className='flex gap-1 items-center'>
                  <MdCheckCircleOutline/> <span>Status</span>
                </button >

                {show==='status'&&<div ref={dropdown3} className="absolute border w-32 bg-white p-4 top-8 right-0">
                  {
                    ['check-in', 'checked-in', 'cancelled'].map((e,i)=>(
                      <button onClick={()=>updateQuery('status',e)} key={i} className="p-1 hover:border " >{e}</button>
                    ))
                  }
                </div>}
              </div>
          </div>

          <div className=" flex gap-2 items-center">
              {Object.entries(queryParams).map(([key, value]) => (
                value && (
                  <div key={key} className="px-2 py-1 flex gap-2 items-center bg-red-100 rounded text-orange-500">
                    { 
                      key==='date' ? new Date(value).toDateString() : value}
                    <FaTimes onClick={()=>updateQuery(key,'')}/>
                  </div>
                )
              ))}
          </div>

        </div>
    </div>

  );
};

export default SearchBar;

