import { UserProfile } from '@auth0/nextjs-auth0/client';
import CTA from '@components/CTA';
import { FormControl } from '@components/styled/Forms';
import { updateItem } from '@utils/rehabspcetable';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { CustomerType } from '@data/rehabspace/types';

interface FormErrors {
	[key: string]: string;
  }
const Details: FC<{
	user: UserProfile;
	customer: CustomerType;
	}> = ({ user,  customer }) => {


	const [formData, setFormData] = useState<Partial<CustomerType>>(
		customer || {
			registrationDate: new Date(),
			customerEmail: user?.email || '',
			firstName: "",
			lastName: "",
			profession: "",
			city: "",
			phoneNumber: "",
			whatsappNumber: "",
			customerType: "Clinician", //TODO
			// sessionBalance: 0,
			birthDay: "",
			gender: "",
			email: user?.email,
		  }
	);
	const [errors, setErrors] = useState<FormErrors>({});
	const [loading, setLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
	  
		try {
		  const { data, error } = await updateItem('customers',{...formData, email: user?.email,}, 'id', customer?.id);
		  if (data) {
			setFormData(data[0])
			setErrors({});
			toast.success('Updated successfully.');
		  } else {
			console.log(error);
			toast.error('Unsuccessful');
		  }
		  console.log({ data, error });
		} catch (error) {
		  console.error('Error submitting the form:', error);
		} finally {
		  setLoading(false);
		}
	  };
	return (
		<AccountDetailsForm
			onSubmit={handleSubmit}>
			<FormControl>
				<label htmlFor="firstName">First Name</label>
				<input
					type="text"
					id="firstName"
					placeholder="John"
					name="firstName"
					value={formData?.firstName || ''}
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
					value={formData?.lastName || ''}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl>
				<label htmlFor="customerEmail">Email</label>
				<input
					type="email"
					id="customerEmail"
					name="customerEmail"
					placeholder="name@email.com"
					value={formData?.customerEmail || ''}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl>
				<label htmlFor="phoneNumber">Phone number</label>
				<input
					type="tel"
					id="phoneNumber"
					placeholder="+2347000000000"
					name="phoneNumber"
					value={formData?.phoneNumber || ''}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl>
				<label htmlFor="whatsappNumber">Whatsapp number</label>
				<input
					type="tel"
					id="whatsappNumber"
					placeholder="+2347000000000"
					name="whatsappNumber"
					value={formData?.whatsappNumber || ''}
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
					value={formData?.profession || ''}
					onChange={handleChange}
				/>
			</FormControl>

			<FormControl>
				<label htmlFor="city">City</label>
				<input
					type="text"
					id="city"
					placeholder="Enter your city"
					autoComplete="organization-title"
					name="city"
					value={formData?.city || ''}
					onChange={handleChange}
				/>
			</FormControl>

			<FormControl>
				<label htmlFor="gender">Gender</label>
				<select
					name="gender"
					id="gender"
					value={formData.gender || ''}
					onChange={handleChange}>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="other">Other</option>
				</select>
			</FormControl>
			<FormControl>
				<label htmlFor="birthDay">Birthday</label>
				<input
					type="date"
					id="birthDay"
					name="birthDay"
					value={formData?.birthDay || ''}
					onChange={handleChange}
				/>
			</FormControl>
			
			
			<CTA disabled={false}>{loading ? 'Submiting...' : 'Save'}</CTA>
		
		</AccountDetailsForm>
	);
};

export default Details;

export const AccountDetailsForm = styled.form`
	gap: 1rem 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	& > *:not(button) {
		width: 48%;
	}

	& > button {
		width: 100%;
	}
`;
