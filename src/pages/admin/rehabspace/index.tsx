import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { CustomerType } from '@data/rehabspace/types';
import {dashboardStats, fetchAll, fetchRow, } from "@utils/rehabspcetable"
import { NextPage } from 'next';
import RehabspaceAdmin from '@components/Rehabspace/Admin/RehabspaceAdmin'

type RehabspaceDataProps = {
	location: any,
	holidays: any,
	staff: any,
	bookingPrice: any,
	activityHistory: any,
	title: string;
	stats: any
};

type Props = {
	user: UserProfile;
	customerData: CustomerType;
    rehabspaceData: RehabspaceDataProps;
};

const index: NextPage<Props> = ({rehabspaceData, user, customerData}) => {
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

		
		const {data: customer} = await fetchRow('customers', 'customerEmail', session?.user?.email)

		const rehabspaceData: RehabspaceDataProps = {
			location: [],
			holidays: [],
			staff: [],
			bookingPrice: [],
			activityHistory: [],
			stats: {},
			title: '',
		};


        const holidays = await fetchAll('holidays', 'created_at')
		const location= await fetchAll('location', 'created_at')
		const bookingPrice = await fetchAll('bookingPrice', 'created_at')
        const activityHistory = await fetchRow('activityHistory', 'customerEmail', session?.user?.email)
		const stats = await dashboardStats()

        console.log('rehabspace===', { staff:customer, stats, location, bookingPrice, activityHistory })

        rehabspaceData.location = location as any;
        rehabspaceData.holidays = holidays as any;
        rehabspaceData.stats = stats as any;
        rehabspaceData.staff = customer as any;
        rehabspaceData.bookingPrice = bookingPrice as any;
        rehabspaceData.activityHistory = activityHistory as any;


		return {
			props: {
				rehabspaceData,
				user: session?.user,
				customerData: customer?.[0] || {},
			},
		};
	},
});