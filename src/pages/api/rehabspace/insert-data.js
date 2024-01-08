// pages/api/rehabspace/insert-data.js

import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { addActivity, insert } from '../../../utils/rehabspcetable';

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

    const { table, data } = req.body;

    const insertionResult = await insert(table, data);
    if (insertionResult?.data) {
      const res = await addActivity([{
        createdAt: new Date(), 
        customerEmail: data?.email, 
        activityType: {
          action: 'Session purchased',
          sessions: data?.sessions,
          amount: data?.amountPaid,
          details: `Paid for ${data?.sessions} sessions.`,
        },
      }])
      console.log('activity added:', res)
    }

    res.status(200).json(insertionResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
