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

// read all rows
export const fetchAll = async (table) => await supabase
  .from(table)
  .select('*')

// read a specific row, e.g fetch a user with user id.
export const fetchOneRow = async (table, column, columnValue) => await supabase
.from(table)
.select('*')
.eq(column,columnValue)
		
          
// resd specific column like all categories, or all emails
export const fetchSpecificColumn = async (table,column ) =>  await supabase
  .from(table)
  .select(column)

// read reference table
export const fetchReferencedTable = async (table, column, other_table, foreign_key  ) => await supabase
  .from(table)
  .select(`
    ${column},
    ${other_table} (
      ${foreign_key}
    )
  `)

// with pagination
export const fetchWithPagination = async (table, start, end ) => await supabase
  .from(table)
  .select('*')
  .range(start, end)

// insert a row
export const insert = async (table, list ) => await supabase
  .from(table)
  .insert(list)
  .select()

//  Update matching rows
export const updateItem = async (table, data, column, columnValue, ) => await supabase
	.from(table)
	.update(data)
	.eq(column, columnValue)
	.select()

// Delete matching rows
export const deleteItem = async (table,  column, columnValue, ) => await supabase
	.from(table)
	.delete()
	.eq( column, columnValue)
