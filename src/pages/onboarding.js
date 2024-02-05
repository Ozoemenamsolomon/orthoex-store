import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import OnboardingForm from '../components/account/OnboardingForm';
import { fetchCustomer, fetchOneRow } from '../utils/rehabspcetable';

const Onboarding = ({ user }) => {
  return <OnboardingForm user={user} />;
};

export default Onboarding;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res, params }) {
    try {
      const session = await getSession(req, res);

      if (!session || !session.user || !session.user.email) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      return {
        props: {
          user:session?.user,
        },
      };
    } catch (error) {
      console.error('Error fetching user data:', error);

      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  },
});
