import { UserProfile } from '@auth0/nextjs-auth0/client';
import CTA from '@components/CTA';
import { FormControl } from '@components/styled/Forms';
import { FC, useState } from 'react';
import styled from 'styled-components';

type UserFromDB = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	profession: string;
	gender: string;
	birthday: string;
};

const Details: FC<{
	user: UserProfile;
	savedUserData: Partial<UserFromDB>;
}> = ({ user, savedUserData }) => {
	const [localUserData, setLocalUserData] = useState<Partial<UserFromDB>>(
		savedUserData || {},
	);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setLocalUserData({
			...localUserData,
			[e.target.name]: e.target.value,
		});
	};

	const isLocalUserDataSameAsSavedUserData =
		JSON.stringify(localUserData) === JSON.stringify(savedUserData);
	return (
		<AccountDetailsForm
			onSubmit={e => {
				e.preventDefault();
				console.log({
					changeabbleUserData: localUserData,
					savedUserData,
				});
			}}>
			<FormControl>
				<label htmlFor="firstName">First Name</label>
				<input
					type="text"
					id="firstName"
					placeholder="John"
					name="firstName"
					value={localUserData?.firstName || ''}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl>
				<label htmlFor="lastName">Last Name</label>
				<input
					type="text"
					id="lastName"
					placeholder="Doe"
					name="lastName"
					value={localUserData?.lastName || ''}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					defaultValue={user.email || ''}
					readOnly
				/>
			</FormControl>
			<FormControl>
				<label htmlFor="phone">Phone</label>
				<input
					type="tel"
					id="phone"
					placeholder="+2347000000000"
					name="phone"
					value={localUserData?.phone || ''}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl>
				<label htmlFor="profession">Profession</label>
				<input
					type="text"
					id="profession"
					placeholder="Enter your profession"
					autoComplete="organization-title"
					name="profession"
					value={localUserData?.profession || ''}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl>
				<label htmlFor="gender">Gender</label>
				<select
					name="gender"
					id="gender"
					value={localUserData.gender || ''}
					onChange={handleChange}>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="other">Other</option>
				</select>
			</FormControl>
			<FormControl>
				<label htmlFor="birthday">Birthday</label>
				<input
					type="date"
					id="birthday"
					name="birthday"
					value={localUserData?.birthday || ''}
					onChange={handleChange}
				/>
			</FormControl>
			{!isLocalUserDataSameAsSavedUserData && (
				<CTA disabled={isLocalUserDataSameAsSavedUserData}>Save</CTA>
			)}
		</AccountDetailsForm>
	);
};

export default Details;

const AccountDetailsForm = styled.form`
	gap: 1rem 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	& > *:not(button) {
		width: 48%;
	}
	/* & > div:nth-child(7) {
		width: 100%;
		display: flex;
		justify-content: space-between;
		& > * {
			width: 48%;
		}
		@media ${({ theme }) => theme.breakpoints.above.sm} {
			width: 48%;
		}
	} */

	& > button {
		width: 100%;
	}
`;
