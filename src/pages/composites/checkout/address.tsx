import CTA from '@components/CTA';
import CartItem from '@components/CartItem';
import { AccountDetailsForm } from '@components/account/Details';
import { Container } from '@components/styled';
import { FormControl } from '@components/styled/Forms';
import { Title } from '@components/styled/Temp';
import { singleDBProductToProductMapper } from '@data/productsData';
import { useCart } from 'context/cartContext';
import { NextPage } from 'next';
import { useState } from 'react';

const Address: NextPage<{
	states: {
		id: number;
		name: string;
	}[];
}> = ({ states }) => {
	const [address, setAddress] = useState<
		| {
				CO?: string;
				streetAdress?: string;
				state?: string;
				lga?: string;
				phone?: string;
		  }
		| undefined
	>(undefined);

	const formSubitable =
		address?.CO &&
		address?.streetAdress &&
		address?.state &&
		address?.lga &&
		address?.phone;

	const { cart, cartProducts, checkout } = useCart({
		withProductDetails: true,
	});

	const [lga, setLga] = useState<
		{
			id: number;
			name: string;
		}[]
	>([]);

	const transformedProducts = cartProducts.map(product => ({
		...singleDBProductToProductMapper(product),
		quantity:
			cart.find(item => item.productVariantID === product.variantID.toString())
				?.quantity || 0,
	}));

	return (
		<Container
			paddingMultiplierSmall={1}
			style={{
				display: 'flex',
				gap: '2rem',
			}}>
			<div>
				<Title>Delivery adddress</Title>
				<AccountDetailsForm
					onSubmit={e => {
						e.preventDefault();

						if (!formSubmitable) {
							return;
						}

						console.log(address);
						checkout(address);
					}}>
					<FormControl>
						<label htmlFor="state">Full name</label>
						<input
							type="text"
							placeholder="John Doe"
							value={address?.CO}
							onChange={e => setAddress({ ...address, CO: e.target.value })}
						/>
					</FormControl>
					<FormControl>
						<label htmlFor="state">Phone</label>
						<input
							type="text"
							placeholder="+2347000000000"
							value={address?.phone}
							onChange={e => setAddress({ ...address, phone: e.target.value })}
						/>
					</FormControl>
					<FormControl
						style={{
							width: '100%',
						}}>
						<label htmlFor="address">Address</label>
						<textarea
							id="address"
							placeholder="Street, number, city"
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
							onChange={e => setAddress({ ...address, lga: e.target.value })}>
							<option value="">Select LGA</option>
							{lga.map((lga, index) => (
								<option key={index} value={lga.id}>
									{lga.name}
								</option>
							))}
						</select>
					</FormControl>

					<CTA>{`Place order`}</CTA>
				</AccountDetailsForm>
			</div>
			<div>
				<Title>Your order ({cart.length} items)</Title>
				{transformedProducts.map((item: any, index: any) => (
					<CartItem readOnly key={`checkout-item-${index}`} {...item} />
				))}
			</div>
		</Container>
	);
};

export default Address;

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
