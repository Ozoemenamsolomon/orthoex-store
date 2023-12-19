import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://gsnqnfknkhpeneqjcuqr.supabase.co';
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzbnFuZmtua2hwZW5lcWpjdXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4MTQ4NTEsImV4cCI6MjAwODM5MDg1MX0.vYp-KA8hy6noRRs_lbBENbRdx1EPY4-iVcBnW-0KiL4`;
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
