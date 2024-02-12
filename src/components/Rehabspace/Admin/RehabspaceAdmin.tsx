import React, { useEffect, useState } from 'react';
import ColumnA from './ColumnA';
import ColumnB from './ColumnB';
import ColumnC from './ColumnC';
import { fetchActivities, fetchCustomer } from '@utils/rehabspcetable';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import BookingModal from '../Account/BookingModal';
import { stringToJson } from '@utils/stringToJson';
import { Activity, Appointment, CustomerType } from '@data/rehabspace/types';

type RehabspaceAdminProps = {
  rehabspaceData: any;
};

const RehabspaceAdmin: React.FC<RehabspaceAdminProps> = ({ rehabspaceData }) => {
  let appointments = rehabspaceData?.appointments?.data;
  const [customer, setCustomer] = useState<CustomerType | null>(null);
  const [customerLog, setCustomerLog] = useState<Activity[]>([]);
  const [toggle, setToggle] = useState<any>(appointments?.[0]?.id);
  const { query } = useRouter();
  const [booking, setBooking] = useState<string | null>(new Date().toLocaleString());
//   const [show, setShow] = useState<number>(0);
  const [loadingLog, setLoadingLog] = useState<number>(0);
  const [appointmentTable, setAppointmentTable] = useState<Appointment>(appointments);

  const updateCustomer = async (customer: string) => {
    try {
      const { data, error } = await fetchCustomer(stringToJson(customer)?.email || stringToJson(customer)?.customerEmail);
      setCustomer(data?.[0]);
      console.log({ data, error });
      if (data?.[0]) {
        setLoadingLog(1);
        const log = await fetchActivities(data?.[0]?.email || data?.[0]?.customerEmail);
        if (log?.data) {
          setCustomerLog(log?.data);
        } else {
          toast.error('Error fetching customer log');
        }
      } else {
        toast.error('Error fetching customer');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingLog(0);
    }
  };

  useEffect(() => {
    updateCustomer(stringToJson(appointments?.[0]?.user));
  }, []);

  return (
    <main className="mx-auto  max-w-[1500px] max-md:px-[1rem] px-[4rem] py-12 ">
      {query?.action === 'booking' ? (
        <BookingModal
          customer={customer}
          setCustomer={setCustomer}
          location={rehabspaceData?.location}
          holidays={rehabspaceData?.holidays}
          booking={booking}
          setBooking={setBooking}
        //   setShow={setShow}
        />
      ) : (
        ''
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="md:grid hidden">
          <ColumnA
            rehabspaceData={rehabspaceData}
            setToggle={setToggle}
            toggle={toggle}
            customer={customer}
            setCustomerLog={setCustomerLog}
            appointmentTable={appointmentTable}
            setAppointmentTable={setAppointmentTable}
            updateCustomer={updateCustomer}
          />
        </div>
        <div className="md:hidden">
          {!toggle ? (
            <ColumnA
              toggle={toggle}
              rehabspaceData={rehabspaceData}
              setToggle={setToggle}
              customer={customer}
              setCustomerLog={setCustomerLog}
              appointmentTable={appointmentTable}
              setAppointmentTable={setAppointmentTable}
              updateCustomer={updateCustomer}
            />
          ) : (
            <div className="md:hidden">
              <ColumnB  type={'button'} loading={loadingLog} customer={customer} setToggle={setToggle}  customerLog={customerLog}  />
            </div>
          )}
        </div>

        <div className="md:grid hidden">
          <ColumnB type={''} setToggle={setToggle}  loading={loadingLog} customer={customer} customerLog={customerLog} />
        </div>

        <ColumnC rehabspaceData={rehabspaceData} appointmentTable={appointmentTable} />
      </div>
    </main>
  );
};

export default RehabspaceAdmin;
