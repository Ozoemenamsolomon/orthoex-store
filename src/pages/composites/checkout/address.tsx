import CTA from '@components/CTA';
import CartItem from '@components/CartItem';
import { AccountDetailsForm } from '@components/account/Details';
import { Container } from '@components/styled';
import { FormControl } from '@components/styled/Forms';
import { Title } from '@components/styled/Temp';
import { formatPrice } from '@utils/index';
import { useCart } from 'context/cartContext';
import { NextPage } from 'next';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
const Address: NextPage<{
	states: {
		id: number;
		name: string;
	}[];
}> = ({ states }) => {
	const [address, setAddress] = useState<{
		fullName: string;
		phone: string;
		streetAdress: string;
		state: string;
		lga: string;
		deliveryOption: string;
	}>({
		fullName: '',
		phone: '',
		streetAdress: '',
		state: '',
		lga: '',
		deliveryOption: 'selfPickup',
	});
	const [deliveryFee, setDeliveryFee] = useState(0);

	const formSubmitable =
		address.deliveryOption === 'selfPickup'
			? address.fullName && address.phone
			: address.streetAdress &&
			  address.state &&
			  address.lga &&
			  address.fullName &&
			  address.phone &&
			  deliveryFee;

	const { cart, cartProducts, checkout } = useCart({
		withProductDetails: true,
	});

	const [lga, setLga] = useState<
		{
			id: number;
			name: string;
		}[]
	>([]);

	const subTotal =
		cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0) ||
		0;

	return (
		<Container
			paddingMultiplierSmall={1}
			verticalPaddingInREM={2}
			style={{
				display: 'flex',
				gap: '2rem',
				flexWrap: 'wrap',
				alignContent: 'stretch',
			}}>
			<AddressFormWrapper
				style={{
					flex: 3,
				}}>
				<Title>Delivery adddress</Title>
				<AccountDetailsForm
					onSubmit={e => {
						e.preventDefault();

						if (!formSubmitable) {
							toast.error('Some fields are missing');
							return;
						}

						console.log({ address });
						checkout(address);
					}}>
					<FormControl>
						<label htmlFor="fullName">Full name</label>
						<input
							type="text"
							placeholder="John Doe"
							value={address?.fullName}
							id="fullName"
							onChange={e =>
								setAddress({ ...address, fullName: e.target.value })
							}
						/>
					</FormControl>
					<FormControl>
						<label htmlFor="phone">Phone</label>
						<input
							type="text"
							placeholder="+2347000000000"
							id="phone"
							value={address?.phone}
							onChange={e => setAddress({ ...address, phone: e.target.value })}
						/>
					</FormControl>
					<div
						style={{
							display: 'flex',
							gap: '2rem',
						}}>
						<FormControl>
							<label htmlFor="selfPickup">Pickup</label>
							<input
								type="radio"
								name="deliveryOption"
								id="selfPickup"
								value="selfPickup"
								checked={address?.deliveryOption === 'selfPickup'}
								onChange={e =>
									setAddress({ ...address, deliveryOption: e.target.value })
								}
							/>
						</FormControl>
						<FormControl>
							<label htmlFor="waybill">Waybill</label>
							<input
								type="radio"
								name="deliveryOption"
								id="waybill"
								value="waybill"
								checked={address?.deliveryOption === 'waybill'}
								onChange={e =>
									setAddress({ ...address, deliveryOption: e.target.value })
								}
							/>
						</FormControl>
					</div>
					{address?.deliveryOption === 'waybill' && (
						<>
							<FormControl
								style={{
									width: '100%',
								}}>
								<label htmlFor="address">Address</label>
								<textarea
									id="address"
									placeholder="House no., Street name, City"
									name="streetAdress"
									value={address?.streetAdress}
									onChange={e =>
										setAddress({ ...address, streetAdress: e.target.value })
									}
								/>
							</FormControl>
							<FormControl>
								<label htmlFor="state">State</label>
								<select
									name="state"
									id="state"
									onChange={e => {
										setAddress({ ...address, state: e.target.value });
										fetch(`/api/lgas?state=${e.target.value}`)
											.then(res => res.json())
											.then(data => {
												setLga(data);
											});
									}}>
									<option value="">Select State</option>
									{states.map((state, index) => (
										<option key={index} value={state.id}>
											{state.name}
										</option>
									))}
								</select>
							</FormControl>
							<FormControl>
								<label htmlFor="lga">LGA</label>
								<select
									name="lga"
									id="lga"
									onChange={e => {
										setAddress({ ...address, lga: e.target.value });
										//if value is not empty

										{
											//  estimate delivery fee
											const estimatedDeliveryFee = 0;

											setDeliveryFee(estimatedDeliveryFee);
										}
									}}>
									<option value="">Select LGA</option>
									{lga.map((lga, index) => (
										<option key={index} value={lga.id}>
											{lga.name}
										</option>
									))}
								</select>
							</FormControl>
						</>
					)}

					<CTA>Place order</CTA>
				</AccountDetailsForm>
			</AddressFormWrapper>
			<OrderDetailsWrapper>
				<div
					style={{
						flex: 1,
					}}>
					<Title>Your order ({cart.length} items)</Title>
					{cartProducts.map((item: any, index: any) => (
						<CartItem readOnly key={`checkout-item-${index}`} {...item} />
					))}
				</div>
				<p>
					Subtotal:
					<span>{formatPrice(subTotal)}</span>
				</p>
				<p>
					Delivery fee:
					<span>{!deliveryFee ? '----' : formatPrice(deliveryFee)}</span>
				</p>
				<p>
					Total: <span>{formatPrice(subTotal + deliveryFee)}</span>
				</p>
			</OrderDetailsWrapper>
		</Container>
	);
};

export default Address;

const OrderDetailsWrapper = styled.div`
	flex: 1;
	box-shadow: 2px 2px 9px 1px rgb(0 0 0 / 10%);
	border-radius: 5px;
	padding: 1rem;
	display: flex;
	flex-direction: column;

	> p {
		display: flex;
		justify-content: space-between;
	}
`;
const AddressFormWrapper = styled.div`
	flex: 3;
	box-shadow: 2px 2px 9px 1px rgb(0 0 0 / 10%);
	border-radius: 5px;
	padding: 1rem;
`;

export const getServerSideProps = async () => {
	const states = [
		{ id: 1, name: 'Abia' },
		{ id: 2, name: 'Adamawa' },
		{ id: 3, name: 'Akwa Ibom' },
		{ id: 4, name: 'Anambra' },
		{ id: 5, name: 'Bauchi' },
		{ id: 6, name: 'Bayelsa' },
		{ id: 7, name: 'Benue' },
		{ id: 8, name: 'Borno' },
		{ id: 9, name: 'Cross River' },
		{ id: 10, name: 'Delta' },
		{ id: 11, name: 'Ebonyi' },
		{ id: 12, name: 'Edo' },
		{ id: 13, name: 'Ekiti' },
		{ id: 14, name: 'Enugu' },
		{ id: 15, name: 'Federal Capital Territory' },
		{ id: 16, name: 'Gombe' },
		{ id: 17, name: 'Imo' },
		{ id: 18, name: 'Jigawa' },
		{ id: 19, name: 'Kaduna' },
		{ id: 20, name: 'Kano' },
		{ id: 21, name: 'Katsina' },
		{ id: 22, name: 'Kebbi' },
		{ id: 23, name: 'Kogi' },
		{ id: 24, name: 'Kwara' },
		{ id: 25, name: 'Lagos' },
		{ id: 26, name: 'Nassarawa' },
		{ id: 27, name: 'Niger' },
		{ id: 28, name: 'Ogun' },
		{ id: 29, name: 'Ondo' },
		{ id: 30, name: 'Osun' },
		{ id: 31, name: 'Oyo' },
		{ id: 32, name: 'Plateau' },
		{ id: 33, name: 'Rivers' },
		{ id: 34, name: 'Sokoto' },
		{ id: 35, name: 'Taraba' },
		{ id: 36, name: 'Yobe' },
		{ id: 37, name: 'Zamfara' },
	];

	return {
		props: {
			states,
		},
	};
};
