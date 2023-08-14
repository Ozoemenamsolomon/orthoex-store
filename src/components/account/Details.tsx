import CTA from '@components/CTA';
import { FormControl } from '@components/styled/Forms';
import styled from 'styled-components';

const Details = () => {
	return (
		<AccountDetailsForm
			style={{ display: 'flex', flexWrap: 'wrap' }}
			onSubmit={e => {
				e.preventDefault();
			}}>
			<FormControl>
				<label htmlFor="firstName">First Name</label>
				<input type="text" id="firstName" />
			</FormControl>
			<FormControl>
				<label htmlFor="lastName">Last Name</label>
				<input type="text" id="lastName" />
			</FormControl>
			<FormControl>
				<label htmlFor="email">Email</label>
				<input type="email" id="email" />
			</FormControl>
			<FormControl>
				<label htmlFor="phone">Phone</label>
				<input type="tel" id="phone" />
			</FormControl>
			<fieldset>
				<legend>Address</legend>
				<FormControl>
					<label htmlFor="country">Country</label>
					<input type="text" id="country" />
				</FormControl>
				<FormControl>
					<label htmlFor="state">State</label>
					<input type="text" id="state" />
				</FormControl>
				<FormControl>
					<label htmlFor="city">City</label>
					<input type="text" id="city" />
				</FormControl>
			</fieldset>
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
	& > *:not(fieldset) {
		width: 48%;
	}
	& > fieldset {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		> *:not(legend) {
			width: 48%;
		}
	}
	& > button {
		width: 100%;
	}
`;
