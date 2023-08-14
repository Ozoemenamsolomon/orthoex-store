import CTA from '@components/CTA';
import { FormControl } from '@components/styled/Forms';
import styled from 'styled-components';

const Details = () => {
	return (
		<AccountDetailsForm
			onSubmit={e => {
				e.preventDefault();
			}}>
			<FormControl>
				<label htmlFor="firstName">First Name</label>
				<input type="text" id="firstName" placeholder="John" />
			</FormControl>
			<FormControl>
				<label htmlFor="lastName">Last Name</label>
				<input type="text" id="lastName" placeholder="Doe" />
			</FormControl>
			<FormControl>
				<label htmlFor="email">Email</label>
				<input type="email" id="email" placeholder="johndoe@example.com" />
			</FormControl>
			<FormControl>
				<label htmlFor="phone">Phone</label>
				<input type="tel" id="phone" placeholder="+2347000000000" />
			</FormControl>
			<FormControl>
				<label htmlFor="profession">Profession</label>
				<input
					type="text"
					id="profession"
					placeholder="Enter your profession"
					autoComplete="organization-title"
				/>
			</FormControl>
			<FormControl>
				<label htmlFor="gender">Gender</label>
				<select name="gender" id="gender">
					<option>Male</option>
					<option>Female</option>
					<option>Other</option>
				</select>
			</FormControl>
			<FormControl>
				<label htmlFor="dateOfBirth">Date of Birth</label>
				<input type="date" id="dateOfBirth" />
			</FormControl>
			<CTA>Save</CTA>
		</AccountDetailsForm>
	);
};

export default Details;

const AccountDetailsForm = styled.form`
	gap: 1rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	& > *:not(button):not(:nth-child(5)) {
		width: 48%;
	}

	& > button,
	& > *:nth-child(5) {
		width: 100%;
	}
`;
