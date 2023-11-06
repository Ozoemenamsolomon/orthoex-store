import { CartState } from 'context/cartContext';
import { ProductType } from './products';

export const getProductsByMultipleIDs = async (cart: CartState) => {
	try {
		const response = await fetch('/api/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ cart }),
		});
		const products = await response.json();

		return products as ProductType[];
	} catch (errorFromBE) {
		console.log({ errorFromBE });
		return [];
	}
};
