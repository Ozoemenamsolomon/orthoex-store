import { useRef, useState } from 'react';
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
import { FaCalendarAlt, FaCalendarWeek, FaMapPin, FaRegClock, FaUserAlt } from 'react-icons/fa';
import { MdCheckCircleOutline } from 'react-icons/md';
import { tableLength } from '@utils/rehabspcetable';

const SearchBar = ({  setLoading, setCounting, pageSize,  updatePagination, offset, setAppointmentTable }) => {
  const dropdown = useRef(null)
  const dropdown1 = useRef(null)
  const dropdown2 = useRef(null)
  const dropdown3 = useRef(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [column, setColumn] = useState('customerName');

  const [show, setShow] = useState('')

  useClickOutside(dropdown, ()=>setShow(''))
  useClickOutside(dropdown1, ()=>setShow(''))
  useClickOutside(dropdown2, ()=>setShow(''))
  useClickOutside(dropdown3, ()=>setShow(''))

  const handleModal = async (type, query) => {
    if (type===show){
      setShow('')
    } else {
      setShow(type)
    }
   
  };

  const search = async (query, type, e) => {
    if(e){
      e.preventDefault()
    }
    setLoading(true);
    const {count} = await tableLength('appointment')
    try {
      let result;
      if (type==='location') {
        result = await supabaseClient
        .from('appointment') 
        .select('*')
        .ilike('locationName', `%${query}%`) 
      } else if (type==='customerType') {
        result = await supabaseClient
        .from('appointment') 
        .select('*')
        .ilike('customerType', `%${query}%`) 
      } else if (type==='date') {
        result = await supabaseClient
        .from('appointment') 
        .select('*')
        .eq('appointmentDate', `%${new Date(query).toDateString()}%`) 
        .eq('appointmentDateTime', `%${new Date(query).toTimeString()}%`) 
      }  else if (type==='status') {
        result = await supabaseClient
        .from('appointment')
        .select('*')
        .eq('status->>status', query);
      } else if (type === 'default') {
        result= await supabaseClient
        .from('appointment') 
        .select('*')  
        .ilike('customerName', `%${query}%`) 
      }
        if (result?.data) {
          console.log(result)
            setAppointmentTable(result?.data)
            updatePagination(count, 'search', result?.data);
        } else {
            console.log(result?.error);
            setAppointmentTable([])
            updatePagination(count, 'search', []);
        }

    } catch (error) {
        console.log(error);
        setAppointmentTable([])
        updatePagination(count, 'search', []);
    } finally {
      setLoading(false);
      setShow('')
    }
  }
  

  return (
    <div>
        <div className="flex items-center justify-between w-full gap-4 pt-6 px-4">
          <form className="w-full p-3 bg-[var(--oex-lightest-grey)] rounded-full flex items-center justify-between gap-2">
            <div className="text-[var()]">
              <button onClick={(e)=>search(searchTerm, 'default', e)}>
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
              <button onClick={()=>setShow(prev=>!prev)}><FilterIcon /></button>
              <div className="text-[12px] text-[var(--oex-dark-grey)]">View</div>
          </div>
        </div>

        <div className="flex items-center py-3 px-4 justify-between div" >
            <div className="relative  border-r pr-3">
              <button onClick={()=>handleModal('location', )} className='flex gap-1 items-center'>
                <MapIcon/> <span>Location</span>
              </button>

              {show==='location'&&<div ref={dropdown} className="absolute border bg-white p-4 top-8 left-0">
                {
                  ['Mafoluku', 'Ikorodu'].map((e,i)=>(
                    <button key={i}  onClick={()=>search(e, 'location')}  className='p-1 hover:border duration-300'>{e}</button>
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
                    <button key={i}  onClick={()=>search(e, 'customerType')} className='p-1 hover:border duration-300'>{e}</button>
                  ))
                }
              </div>
              }
            </div>

            <div className="relative  border-r pr-3">
              <button  onClick={()=>handleModal('date')} className='flex gap-1 items-center'>
                <FaCalendarAlt/> <span>Date</span>
              </button >

              {show==='date'&&<div ref={dropdown2}  className="absolute border bg-white p-4 top-8 -left-20">
                <input onChange={(e=>search(e.target.value, 'date'))} type="datetime-local" name="" id=""  className=''/>
              </div>}
            </div>

            <div  className="relative  ">
              <button onClick={()=>handleModal('time')} className='flex gap-1 items-center'>
                <MdCheckCircleOutline/> <span>Status</span>
              </button >

              {show==='time'&&<div ref={dropdown3} className="absolute border w-32 bg-white p-4 top-8 right-0">
                {
                  ['check-in', 'checked-in', 'cancelled'].map((item,idx)=>(
                    <button onClick={()=>search(item, 'status')} key={idx} className="p-1 hover:border " >
                      {item}
                    </button>
                  ))
                }
              </div>}
            </div>
        </div>
    </div>

  );
};

export default SearchBar;

