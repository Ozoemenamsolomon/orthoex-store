import React, {FC, useState, FormEvent, ChangeEvent } from 'react';
import {insert, updateItem} from "../../utils/rehabspcetable"
import { useRouter } from 'next/router';
import {toast} from "react-toastify"
import { CustomerType } from '@data/rehabspace/types';
import { UserProfile , } from '@auth0/nextjs-auth0/client';

interface OnboardingFormProps {
  user: UserProfile;
}

interface FormErrors {
  customerEmail?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
}

interface FormErrors {
  [key: string]: string;
}
const OnboardingForm: FC<OnboardingFormProps> = ({user}) => {
  const {push}=useRouter()

  const initialFormData: Partial<CustomerType> = {
    registrationDate: new Date(),
    customerEmail: user?.email || '', 
    firstName: user?.name || '', 
    lastName: '',
    profession: '',
    city: '',
    phoneNumber:  '', 
    whatsappNumber: '',
    customerType: 'Clinician',
    email: user?.email || '', 
  };
  const clearForm = () => {
    setFormData({
        customerEmail: '',
        firstName: '',
        lastName: '',
        profession: '',
        city: '',
        phoneNumber: '',
        whatsappNumber: '',
        customerType: '',
    })
  };

  const [formData, setFormData] = useState<Partial<CustomerType>>(initialFormData);

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

const validateForm = () => {
  let isValid = true;
  const newErrors: FormErrors = {};

  if (!formData?.customerEmail?.trim()) {
    newErrors.customerEmail = 'Email is required';
    isValid = false;
  }

  if (!formData?.phoneNumber?.trim()) {
    newErrors.phoneNumber = 'Phone Number is required';
    isValid = false;
  }

  if (!formData?.firstName?.trim()) {
    newErrors.firstName = 'First name is required';
    isValid = false;
  }

  if (!formData?.lastName?.trim()) {
    newErrors.lastName = 'Last name is required';
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // const {data,error} = await insert('customers', [formData],  );
      const {data,error} = await updateItem('customers', formData, 'email', user?.email, );
      // console.log( {data,error})
      if (data) {
        clearForm();
        setErrors({});
        push('/account/overview')
        toast.success('successfull')
      }else {
        console.log(error)
        toast.error('Unsuccessfull')
      }
      console.log({data,error})
    } catch (error) {
      console.error('Error submitting the form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md my-14">
      <h3 className="text-2xl font-semibold mb-4">User Onboarding</h3>
      <form onSubmit={handleSubmit}>

        {/* User Email */}
        <div className="mb-4">
          <label htmlFor="userEmail" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="text"
            id="userEmail"
            name="userEmail"
            value={formData.customerEmail || ''}
            onChange={handleInputChange}
            className={`mt-1 p-2 border rounded-md w-full ${errors.userEmail ? 'border-red-500' : ''}`}
          />
          {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>}
        </div>
        {/* FirstName */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleInputChange}
            className={`mt-1 p-2 border rounded-md w-full ${errors.firstName ? 'border-red-500' : ''}`}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>

        {/* LastName */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleInputChange}
            className={`mt-1 p-2 border rounded-md w-full ${errors.lastName ? 'border-red-500' : ''}`}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>

        {/* PhoneNumber */}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber || ''}
            onChange={handleInputChange}
            className={`mt-1 p-2 border rounded-md w-full ${errors.phoneNumber ? 'border-red-500' : ''}`}
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
        </div>

        {/* WhatsappNumber */}
        <div className="mb-4">
          <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-600">
            Whatsapp Number
          </label>
          <input
            type="text"
            id="whatsappNumber"
            name="whatsappNumber"
            value={formData.whatsappNumber || ''}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

                {/* Profession */}
                <div className="mb-4">
          <label htmlFor="profession" className="block text-sm font-medium text-gray-600">
            Profession
          </label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession || ''}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-600">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city || ''}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-orange-600 text-white w-full px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingForm;