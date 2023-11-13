import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://jwaehzopnnmifvduslpj.supabase.co';
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3YWVoem9wbm5taWZ2ZHVzbHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4ODc2MzEsImV4cCI6MjAxNTQ2MzYzMX0.nC1K9WEJ8qhRK81G20mdffg45p114tnT0V5DI4L7vJE`;
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to insert data into the 'rehabspace_booking' table
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
