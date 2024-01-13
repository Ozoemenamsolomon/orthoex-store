// pages/api/rehabspace/insert-data.js

import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import {  insert, updateHistoryAndSessionBalance } from '../../../utils/rehabspcetable';

export default withApiAuthRequired(async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  try {
    const session = await getSession(req, res);
    if (!session?.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { table, data, customer,  user} = req.body;

    const insertionResult = await insert(table, data);
    if (insertionResult?.data?.[0]) {
      const res = await updateHistoryAndSessionBalance({...insertionResult?.data?.[0], customer: customer, user: user, table:table})
      console.log('activity added to ', table, ' table== ', res)
    }

    res.status(200).json(insertionResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// const result = await updateHistoryAndSessionBalance({...insertionResult?.data?.[0], user: customer, })