import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import OnboardingForm from '../components/account/OnboardingForm';
import { fetchOneRow } from '../utils/rehabspcetable';

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

      const userEmail = session.user.email;
      const user = await fetchOneRow('customers', 'customerEmail', userEmail);

      console.log('user ==', user);

      if (!user || !user.data || user.data.length === 0) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      return {
        props: {
          user: user.data[0],
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
