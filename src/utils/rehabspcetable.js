import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const insertBooking = async bookingData => {
	try {
		const { data, error } = await supabase
			.from('rehabspace_booking')
			.insert(bookingData);
		if (error) {
			console.error('Error inserting data:', error.message);
			return { success: false, error: error.message };
		}
		console.log('Data inserted successfully:', data);
		return { success: true, data };
	} catch (error) {
		console.error('Unexpected error:', error.message);
		return { success: false, error: error.message };
	}
};
