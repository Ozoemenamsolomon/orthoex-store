import { CartState } from 'context/cartContext';

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

		return products;
	} catch (errorFromBE) {
		console.log({ errorFromBE });
	}
};
