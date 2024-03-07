
// pages/api/rehabspace/insert-data.js

import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import {  fetchAll, } from '../../../utils/rehabspcetable';

export default withApiAuthRequired(async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  try {
    const session = await getSession(req, res);
    if (!session?.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    // .from(table)
    // .select('*', { count: 'exact', head: true })
    const appointments = await fetchAll('appointment');
    const customers = await fetchAll('customers');
    if (appointments?.data) {

     
    }

    res.status(200).json({customers: customers?.data?.length, appointmentsCount: appointments?.data?.length});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


    // const checkedInCount = totalAppointments.rows[0].count;

    // // Similar queries for 'cancelled' and 'check-in'
    // // ...

    // const totalCount = checkedInCount + cancelledCount + checkInCount;

    // const checkedInPercentage = (checkedInCount / totalCount) * 100;
    // const cancelledPercentage = (cancelledCount / totalCount) * 100;
    // const checkInPercentage = (checkInCount / totalCount) * 100;

    // const stats = {
    //   checkedIn: checkedInPercentage,
    //   cancelled: cancelledPercentage,
    //   checkIn: checkInPercentage,
    // };