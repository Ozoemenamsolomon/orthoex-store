import { useState } from 'react';
import { useRouter } from 'next/router';

export default function BookingForm({ btnText, apiErrorMessage }) {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [error, setError] = useState(null);
	const [apiError, setApiError] = useState(null);
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();
		if (!email) {
			setError('Email is required');
			return;
		}

		setLoading(true);
		setError(null);

		try {
			//   await onSubmit(email);
			// Successful submission, you can redirect or display a success message here
			await setTimeout(() => {
				setSuccess('Booking was sucessful');
				setLoading(false);
				setApiError(apiErrorMessage);
			}, 3000);
		} catch (err) {
			setError('An error occurred while submitting your email.');
		} finally {
		}
	};

	return (
		<form onSubmit={handleSubmit} className="">
			<div className="py-8">
				<label htmlFor="email" className="block text-gray-700">
					Email
				</label>
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
						This email has no assign token.{' '}
						<span
							onClick={() => router.push('#')}
							className="text-blue-500 hover:underline durration-300 cursor-pointer ">
							Pay for a session
						</span>{' '}
						to get one.
					</div>
				)}
			</div>
			<button
				type="submit"
				className={`px-4 w-full py-6 rounded-md text-white bg-[var(--oex-orange)] hover:bg-[var(--oex-orange-dark)] duration-300 ${
					loading ? 'opacity-50 cursor-not-allowed' : ''
				}`}
				disabled={loading}>
				{loading ? 'Submitting...' : btnText}
			</button>
		</form>
	);
}
