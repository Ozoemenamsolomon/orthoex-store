import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import { fetchCustomer } from '@utils/rehabspcetable';

// Define the props interface for the component
interface BookingFormProps {
  btnText: string;
  apiErrorMessage: string;
}

export default function BookingForm({ btnText, apiErrorMessage }: BookingFormProps) {
  const router = useRouter();
  const {user} = useUser()

  // State types are inferred from the initial value
  const [email, setEmail] = useState<string>(user?.email || '');
  const [error, setError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }

    setLoading(true);
    setError(null);
    setApiError(null);

    try {
      // Simulate an async operation like an API call
      setTimeout(() => {
        setSuccess('Booking was successful');
        setLoading(false);
        // Optionally handle API error message
        // setApiError(apiErrorMessage);
      }, 3000);
    } catch (err) {
      // If an error occurs, display a generic or specific error message
      setError('An error occurred while submitting your email.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="py-8">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          placeholder="email@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-6 border rounded-md"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-blue-500 text-sm mt-2">{success}</p>}
        {apiError && (
          <div className="text-red-500 text-sm mt-2">
            This email has no assigned token.{' '}
            <span
              onClick={() => router.push('#')}
              className="text-blue-500 hover:underline cursor-pointer duration-300">
              Pay for a session
            </span>
            {' '}to get one.
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`px-4 w-full py-6 rounded-md text-white bg-[var(--oex-orange)] hover:bg-[var(--oex-orange-dark)] duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {loading ? 'Submitting...' : btnText}
      </button>
    </form>
  );
}
