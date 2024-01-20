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

const SearchBar = ({ setResult, setLoading, setCounting }) => {
  const dropdown = useRef(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [column, setColumn] = useState('customerName');

  // search status
  const queryStatus = async (query) => {
    setLoading(true);
    try {
      const { data, error } = await supabaseClient
        .from('appointment')
        .select('*')
        .eq('status.status', `%${query}%`);
  
      if (data && !error) {
        setResult(data);
        setCounting((prev) => ({ ...prev, result: data?.length }));
      } else {
        console.log(error);
        setResult([]);
        setCounting((prev) => ({ ...prev, result: 0 }));
      }
    } catch (error) {
      setResult([]);
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // search bar
  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const { data, error } = await supabaseClient
        .from('appointment') 
        .select('*')
        .ilike('customerName', `%${searchTerm}%`) 

        if (data && !error) {
            setResult(data);
            setCounting(prev =>{ return {...prev, result: data?.length}})
        } else {
            console.log(error);
            setResult([])
            setCounting(prev =>{ return {...prev, result: 0}})

        }

    } catch (error) {
        setResult([])
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const [show, setShow] = useState(false)

  useClickOutside(dropdown, ()=>setShow(false))

  return (
    <div className="flex items-center justify-between w-full gap-4 pt-6 px-4">
    <form className="w-full p-3 bg-[var(--oex-lightest-grey)] rounded-full flex items-center justify-between gap-2">
      <div className="text-[var()]">
        <button onClick={handleSearch}>
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
        <div className="text-)[12px] text-[var(--oex-dark-grey)]">View</div>
        <div ref={dropdown} className={`${show ? 'block' : 'hidden'} absolute top-10 right-0 rounded-md w-40 p-2 border space-y- bg-[var(--oex-off-white)] `}>
          {
            ['check-in', 'checked-in', 'cancelled'].map((item,idx)=>(
              <button onClick={()=>queryStatus(item)} key={idx} className="p-2 hover:border rounded-md" >
                {item}
              </button>
            ))
          }
        </div>
    </div>

    </div>
  );
};

export default SearchBar;

