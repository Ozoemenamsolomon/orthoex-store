import React, { useEffect, useState } from 'react';
import BookingsChart from './BookingsChart';
import BookingStatusDoughnutChart from './DoughnutChart';
import { dashboardStats } from '@utils/rehabspcetable';
import { FaFilter } from 'react-icons/fa';
import { useRouter } from 'next/router';

type ColumnCProps = {
  rehabspaceData: any;
  appointmentTable: any;
};

const ColumnC: React.FC<ColumnCProps> = ({ rehabspaceData, appointmentTable }) => {
  const [stats, setStats] = useState(rehabspaceData?.stats);
  const { query, replace, pathname } = useRouter();

  const fetchAllStats = async (list?: any) => {
    try {
      const results = await dashboardStats(list);
      setStats(results);
    } catch (error:any) {
      console.error('Error fetching stats:', error?.message);
    }
  };

  useEffect(() => {
    if (query?.fetchAllStats) {
      fetchAllStats();
    } else {
      fetchAllStats(appointmentTable);
    }
  }, [query?.fetchAllStats, appointmentTable]);

  const handleFilterButtonClick = () => {
    if (query?.fetchAllStats) {
      replace({
        pathname: pathname,
        query: '',
      });
    } else {
      replace({
        pathname: pathname,
        query: { ...query, fetchAllStats: 'fetchAll' },
      });
    }
  };

  return (
    <div>
      <div className="border md:w-[80vw] lg:w-full px-4 border-[var(--oex-light-grey)] rounded py-6 grid sm:grid-cols-2 gap-8 lg:grid-cols-1 md:col-span-2 lg:col-span-1">
        <div className="space-y-4 pb-4 border-b">
          <h5 className="font-medium">Bookings overview</h5>
          <div className="flex justify-end">
            <button
              onClick={handleFilterButtonClick}
              className={`${query?.fetchAllStats ? 'text-orange-500 ' : ''}  flex gap-2 items-center hover:text-orange-600 duration-300 text-gray-700`}
            >
              <FaFilter />{query?.fetchAllStats ? 'Reset' : 'View All'}
            </button>
          </div>
          <BookingStatusDoughnutChart stats={stats} />
        </div>

        <div className="">
          <h5 className="font-medium">Bookings per day</h5>
          <BookingsChart />
        </div>
      </div>
    </div>
  );
};

export default ColumnC;
