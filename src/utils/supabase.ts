import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';
const supabaseTrainingUrl = process.env.NEXT_PUBLIC_SUPABASE_TRAINING_URL || '';
const supabaseTrainingKey = process.env.NEXT_PUBLIC_SUPABASE_TRAINING_KEY || '';

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
export const supabaseTrainingClient = createClient(
	supabaseTrainingUrl,
	supabaseTrainingKey,
);

// import { useEffect, useState } from 'react';
// import { supabase } from '../utils/supabase';

// export default function Home() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data, error } = await supabase
//           .from('your-table-name')
//           .select('*');
//         if (error) throw error;
//         setData(data);
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Data from Supabase</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }
