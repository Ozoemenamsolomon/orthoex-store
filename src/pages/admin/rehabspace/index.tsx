import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { CustomerType } from '@data/rehabspace/types';
import {fetchAll, fetchRow} from "@utils/rehabspcetable"
import { NextPage } from 'next';
import RehabspaceAdmin from '@components/Rehabspace/Admin/RehabspaceAdmin'

type RehabspaceDataProps = {
	location: any,
	holidays: any,
	bookingPrice: any,
	activityHistory: any,
	title: string;
};

type Props = {
	user: UserProfile;
	customerData: CustomerType;
    rehabspaceData: RehabspaceDataProps;
};

const index: NextPage<Props> = ({rehabspaceData, user, customerData}) => {
  return (
    <RehabspaceAdmin />
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
			bookingPrice: [],
			activityHistory: [],
			title: '',
		};


        const holidays = await fetchAll('holidays')
        const location= await fetchAll('location')
        const bookingPrice = await fetchAll('bookingPrice')
        const activityHistory = await fetchRow('activityHistory', 'customerEmail', session?.user?.email)

        console.log('rehabspace===', { holidays, location, bookingPrice, activityHistory })

        rehabspaceData.location = location as any;
        rehabspaceData.holidays = holidays as any;
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