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
			<div>
				<FormControl>
					<label htmlFor="birthDay">Birth Day</label>
					<select id="birthDay">
						{[...Array(31)].map((_, i) => (
							<option key={i}>{i + 1}</option>
						))}
					</select>
				</FormControl>
				<FormControl>
					<label htmlFor="birthMonth">Birth Month</label>
					<select id="birthMonth">
						{[...Array(12)].map((_, i) => {
							const date = new Date();
							date.setMonth(i);
							return (
								<option key={i}>
									{date.toLocaleString('EN-GB', {
										month: 'long',
									})}
								</option>
							);
						})}
					</select>
				</FormControl>
			</div>
			<CTA>Save</CTA>
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
	& > div:nth-child(7) {
		width: 100%;
		display: flex;
		justify-content: space-between;
		& > * {
			width: 48%;
		}
		@media ${({ theme }) => theme.breakpoints.above.sm} {
			width: 48%;
		}
	}

	& > button {
		width: 100%;
	}
`;
