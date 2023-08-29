import { supabaseClient } from '@utils/supabase';

export const getUnpaidOrder = async (reference: string) => {
	const { data, error } = await supabaseClient
		.from('orders')
		.select('*')
		.eq('reference', reference)
		.eq('paid', false)
		.eq('delivered', false)
		.gt('expiresAt', new Date().toISOString())
		.single();

	if (error) {
		console.log(error);
		return null;
	}

	return data;
};
// ({
// 			variant: any;
// 			variantID: number;
// 			quantity: number;
// 			price: number;
// 			code: string;
// 			name: string;
// 			image: string;
// 			brand: number;
// 			cat: number;
// 			timeStamp: number;
// 		} | null
export const creatOrders = async (
	orders: {
		cart: any;
		totalPrice: number;
		reference: string;
		user: any;
		expiresAt: string;
		status: string;
		address: any;
	}[],
) => {
	const { data: _data, error } = await supabaseClient
		.from('orders')
		.insert(orders);

	if (error) {
		throw error;
	}
};

export function estimateDeliveryFee(lga: string, totalWeight: number): number {
	// TODO: get delivery fee from address and total weight
	return 0;
}
