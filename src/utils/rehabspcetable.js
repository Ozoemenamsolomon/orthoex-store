import { createClient } from '@supabase/supabase-js';
import { stringToJson } from './stringToJson';
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
export const fetchRow = async (table, column, columnValue,) => await supabase
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
export const tableLength = async(table,) => 
	await supabase
	.from(table)
	.select('*', { count: 'exact', head: true })
	
export const fetchWithPagination = async (table, start, end, orderBy ) => {
	const {count, error} = await tableLength(table)

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

// fetch customers activity history
export const fetchBookingPrices = async () => await supabase
.from('bookingPrice')
.select('*')
.order('price', { ascending: true })

// fetch customers activity history
export const fetchActivities = async (email) => await supabase
.from('activityHistory')
.select('*')
.eq('customerEmail', email)
.order('createdAt', { ascending: false });


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
	console.log(response)
	return response
} 

export const updateAppointmentStatus = async (action, appointment) => {
	let response = {};
	let customer = stringToJson(appointment?.user)

	const data = {
		...appointment,
		status:  {
			...appointment?.status,
			status: action==='checked-in' ?  'checked-in' :'cancelled'
			}
	} 
	const result = await updateItem('appointment', data, 'id', appointment?.id)
console.log('result', result)
	if(result.data){
		const activityHistory = await insert('activityHistory', {
			createdAt: new Date(), 
			customerEmail: customer?.email || customer?.customerEmail , 
			activityType: action !== 'cancelled' ? 
			  {
				action: 'Session used',
				sessions: 1,
				amount: 5000,
				details: `Session used at ${appointment?.locationName} `,
			  } 
				  : 
				{
				action: 'Session cancelled',
				sessions: 1,
				amount: 5000,
				details: `Session cancelled by ${'staff'}`,
				} ,
			customerId: customer?.id
		})
		response = {...response, activityHistory: activityHistory.data?.[0]}

		if (activityHistory?.data?.[0]) {
			const customerAccountHistory = await insert(
				'customerAccountHistory', 
				{
					created_at: new Date(),
					userEmail: customer?.email || '' ,
					customerEmail: customer?.customerEmail || '', 
					activityId: activityHistory?.data[0]?.activityId,
					Activity: action !== 'cancelled' ? 
					`Session used at ${appointment?.locationName} ` : 
					`Session cancelled by ${'staff'}`,
					session: 1,
					userId: customer?.id,
					customerId: customer?.id,
				}
			)
			response = {...response, customerAccountHistory: customerAccountHistory?.data?.[0]}
			console.log('action', {activityHistory, customerAccountHistory})
		}
		
	}

	// console.log('update:', response)

	return result;
}


export const dashboardStats = async ( appointmentList) => {
	try {
	  let appointmentCount,
		customersCount,
		openBookingRatio,
		cancelledBookingRatio,
		usedBookingRatio;
  
	  const calculateStats = (list) => {
		const openBooking = list?.filter((item) => item?.status?.status === 'check-in') || [];
		const usedBooking = list?.filter((item) => item?.status?.status === 'checked-in') || [];
		const cancelledBooking = list?.filter((item) => item?.status?.status === 'cancelled') || [];
  
		const totalAppointments = list?.length || 1;

		openBookingRatio = Math.round((openBooking.length / totalAppointments) * 100);
		cancelledBookingRatio = Math.round((cancelledBooking.length / totalAppointments) * 100);
		usedBookingRatio = Math.round((usedBooking.length / totalAppointments) * 100);
	  };
  
	  if (appointmentList) {
		appointmentCount = appointmentList?.length;

		const uniqueCustomerIds = new Set();
		appointmentList.forEach((appointment) => {
		  if (appointment.customerId && !uniqueCustomerIds.has(appointment.customerId)) {
			uniqueCustomerIds.add(appointment.customerId);
		  }
		});
		customersCount = uniqueCustomerIds.size;
		calculateStats(appointmentList);
	  } else {
		const appointments = await fetchAll('appointment', 'id');
		const appointmentQuery = await supabase.from('appointment').select('*', { count: 'exact', head: true });
		const customerQuery = await supabase.from('customers').select('*', { count: 'exact', head: true });
  
		if (appointmentQuery.error || customerQuery.error) {
		  throw new Error('Error fetching counts from the database');
		}
  
		appointmentCount = appointmentQuery?.count || 0;
		customersCount = customerQuery?.count || 0;
		calculateStats(appointments?.data);
	  }

	//   console.log({
	// 	appointmentCount,
	// 	customersCount,
	// 	openBookingRatio,
	// 	cancelledBookingRatio,
	// 	usedBookingRatio,
	//   })
  
	  return {
		appointmentCount,
		customersCount,
		openBookingRatio,
		cancelledBookingRatio,
		usedBookingRatio,
	  };
	} catch (error) {
	  console.error('Error in stats:', error.message);
	  return null; // or handle the error in a way that makes sense for your application
	}
  };
  
export const filterWeeklyData = async (selectedWeek) => {
	const { data, error } = await supabase
		.from('appointment')
		.select()
		.gte('appointmentDate', new Date(selectedWeek?.start).toDateString())
		.lte('appointmentDate',  new Date(selectedWeek?.end).toDateString())

		function countAppointmentsByDay(appointments) {
			const dayCount = {
				"Mon": 0,
				"Tue": 0,
				"Wed": 0,
				"Thu": 0,
				"Fri": 0,
				"Sat": 0,
				"Sun": 0
			};
		
			appointments.forEach(appointment => {
				// Extract the date from the appointmentDateTime
				const appointmentDate = new Date(appointment.appointmentDateTime);
				
				// Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
				const dayOfWeek = appointmentDate.getUTCDay();
		
				// Convert dayOfWeek to day name
				const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOfWeek];
		
				// Update the count for the corresponding day
				dayCount[dayName]++;
			});
		
			// Convert the object to the desired array format
			const resultList = Object.entries(dayCount).map(([day, value]) => ({ day, value }));
		
			return resultList;
		}
		
		const result = countAppointmentsByDay(data);
		console.log(result);
		
	return { data, error, result } 
}