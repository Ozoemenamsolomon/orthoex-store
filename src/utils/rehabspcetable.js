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
export const fetchAll = async (table, orderBy) => await supabase
  .from(table)
  .select('*')
  .order(orderBy, { ascending: false });


// read a specific row, e.g fetch a user with user id.
export const fetchRow = async (table, column, columnValue) => await supabase
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
export const fetchWithPagination = async (table, start, end, orderBy ) => {
	const {count, error} = await supabase
				.from(table)
				.select('*', { count: 'exact', head: true })

	const res = await supabase
		.from(table)
		.select('*')
		.range(start, end)
		.order(orderBy, {ascending: false})

	return {
		count: {count, error},
		data: res.data, error: res.error, res
	}
}

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

// api
export const addActivity = async (list) => {
	try {
		return await insert('activityHistory', list)
	} catch (error) {
		console.log(error)
		return {data: null, error: error}
	}
}


// fetch specific customer
export const fetchCustomer = async (email) => await supabase
.from('customers')
.select('*')
.eq('customerEmail', email)

export const updateHistoryAndSessionBalance = async (sessionPurchaseData) => {
	let response = {};

	const updatedUserSessionBalance = await updateItem(
		'customers', 
		{...sessionPurchaseData?.customer, 
			sessionBalance: sessionPurchaseData?.table !== 'appointment' ? sessionPurchaseData?.customer?.sessionBalance + sessionPurchaseData?.sessions 
			: 
			sessionPurchaseData?.customer?.sessionBalance - 1
		}, 
		'id', sessionPurchaseData?.customer?.id
		)
		response = {updatedUserSessionBalance: updatedUserSessionBalance?.data?.[0]}

	const activityHistory = await insert('activityHistory', {
		createdAt: new Date(), 
		customerEmail: sessionPurchaseData?.customer?.email, 
		activityType: sessionPurchaseData?.table !== 'appointment' ? 
		  {
			action: 'Session purchased',
			sessions: sessionPurchaseData?.sessions,
			amount: sessionPurchaseData?.amountPaid,
			details: `Purchased ${sessionPurchaseData?.sessions} sessions with N${sessionPurchaseData?.amountPaid}`,
		  } 
		  	: 
		  {
			action: 'Session booked',
			sessions: 1,
			amount: 5000,
			details: `Booked ${'1'} session with N${'5000'}`,
		  },
		customerId: sessionPurchaseData?.customer?.id
	})
	response = {...response, activityHistory: activityHistory.data?.[0]}

	if (activityHistory?.data?.[0]) {
		const customerAccountHistory = await insert(
			'customerAccountHistory', 
			{
				created_at: new Date(),
				userEmail: sessionPurchaseData?.user?.email,
				customerEmail: sessionPurchaseData?.customer?.email,
				activityId: activityHistory?.data[0]?.activityId,
				Activity: sessionPurchaseData?.table !== 'appointment' ? 
					`Purchased ${sessionPurchaseData?.sessions} sessions with N${sessionPurchaseData?.amountPaid}` : 
					`Booked ${'1'} session with N${'5000'}`,
				session: sessionPurchaseData?.table !== 'appointment' ?
					sessionPurchaseData?.sessions 
					: 
					1,
				userId: sessionPurchaseData?.customer?.id,
				customerId: sessionPurchaseData?.customer?.id,
			}
		)
		response = {...response, customerAccountHistory: customerAccountHistory?.data?.[0]}
	}
	console.log({updatedUserSessionBalance,activityHistory, customerAccountHistory})
	return response
} 