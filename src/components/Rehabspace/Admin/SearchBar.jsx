import { useState } from 'react';
import {supabaseClient} from '../../../utils/supabase'
import {
	DoubleTick,
	FilterIcon,
	MapIcon,
	ScanIcon,
	SearchIcon,
	UserIcon,
} from '../../../data/rehabspace';

const SearchBar = ({ setResult, setLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [column, setColumn] = useState('customerName');

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
        } else {
            console.log(error);
            setResult([])
        }

    } catch (error) {
        setResult([])
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
};

export default SearchBar;


// {code: '42P01', details: null, hint: null, message: 'relation "public.appointments" does not exist'}