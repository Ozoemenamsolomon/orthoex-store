import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import {dashboardStats, fetchAll, fetchWithPagination, } from "@utils/rehabspcetable"
import { NextPage } from 'next';
import RehabspaceAdmin from '@components/Rehabspace/Admin/RehabspaceAdmin'

type RehabspaceDataProps = {
	location: any,
	holidays: any,
	appointments: any,
	staff: any,
	bookingPrice: any,
	stats: any
	pageSize: number,
};

type Props = {
    rehabspaceData: RehabspaceDataProps;
};

const index: NextPage<Props> = ({rehabspaceData,  }) => {

  return (
    <RehabspaceAdmin rehabspaceData={rehabspaceData}/>
  )
}

export default index

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps({ query, res, req }) {

        const session = await getSession(req, res);

		// if (session?.user?.customerType !== 'Clinician') {
		// 	return {
		// 		redirect: {
		// 			destination: '/account/overview',
		// 			permanent: false,
		// 		},
		// 	};
		// }

		
		// const {data: customer} = await fetchRow('customers', 'customerEmail', session?.user?.email)

		const rehabspaceData: RehabspaceDataProps = {
			location: [],
			holidays: [],
			staff: [],
			bookingPrice: [],
			appointments: [],
			stats: {},
			pageSize: 12,
		};

		

        const holidays = await fetchAll('holidays', 'created_at')
        const appointments = await fetchWithPagination('appointment', 0, rehabspaceData.pageSize - 1, 'id');
		const location= await fetchAll('location', 'created_at')
		const bookingPrice = await fetchAll('bookingPrice', 'created_at')
		const stats = await dashboardStats(appointments?.data)

        console.log('rehabspace===', { staff:session?.user, stats, location, bookingPrice,  })

        rehabspaceData.location = location as any;
        rehabspaceData.appointments = appointments as any;
        rehabspaceData.holidays = holidays as any;
        rehabspaceData.stats = stats as any;
        rehabspaceData.staff = session?.user as any;
        rehabspaceData.bookingPrice = bookingPrice as any;


		return {
			props: {
				rehabspaceData,
			},
		};
	},
});