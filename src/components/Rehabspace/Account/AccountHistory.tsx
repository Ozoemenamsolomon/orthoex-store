import React from 'react';
import {
  SessionBooked,
  SessionCancelled,
  SessionPurchased,
  SessionUsed,
  SessionsIcon,
} from '../../../data/rehabspace';
import { Activity, CustomerType } from '@data/rehabspace/types';

interface AccountHistoryProps {
  log: Activity[];
  customer: CustomerType | null;
  admin: any;
}

const AccountHistory: React.FC<AccountHistoryProps> = ({ log, customer, admin }) => {
  return (
    <div className={admin ? '' : 'overflow-auto h-screen'}>
      {admin ? (
        ''
      ) : (
        <>
          <div className="flex">
            <div className="p-6 border broder-[var(--oex-light-grey)] flex gap-4 items-center">
              <SessionsIcon />
              <div className="">
                <div className="">{customer?.sessionBalance} Sessions</div>
                <small className="text-green-500">Balance</small>
              </div>
            </div>
          </div>
          <h4 className="font-medium pt-6">Recent History</h4>
        </>
      )}

      {log && !log.length ? (
        <div className="h-96 w-full flex justify-center items-center border rounded">
          No log found
        </div>
      ) : (
        log?.map((item, i) => (
          <div className="flex gap-4 border-b py-4" key={i}>
            <div className="flex gap-4 w-3/4">
              {item?.activityType?.action === 'Session cancelled' && <SessionCancelled />}
              {item?.activityType?.action === 'Session booked' && <SessionBooked />}
              {item?.activityType?.action === 'Session purchased' && <SessionPurchased />}
              {item?.activityType?.action === 'Session used' && <SessionUsed />}
              <div className="">
                <div className="">{item?.activityType?.action}</div>
                <div className="">{new Date(item?.createdAt).toLocaleString()}</div>
              </div>
            </div>
            <div className="w-1/4 text-left">
              <div className="font-semibold">₦{item?.activityType?.amount?.toLocaleString('en-US')}</div>
              <div className="text-sm">{item?.activityType?.sessions} Sessions</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AccountHistory;
