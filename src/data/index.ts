import { supabaseClient } from '@utils/supabase';
import lgas from '../../delivery/lgas.json';

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

export const estimateDeliveryFee = async (lga: string, totalWeight: number) => {
	const locationClass = lgas.find(l => l.id === Number(lga))?.class;

	if (!locationClass) {
		throw new Error('Invalid LGA');
	}

	const deliveryFeeEstimate = await getDeliveryFee(totalWeight, locationClass);

	const deliveryFee =
		deliveryFeeEstimate?.partnerfee + deliveryFeeEstimate?.basefee;

	return {
		deliveryFee,
		comment: deliveryFeeEstimate.comment,
		deliverydays: deliveryFeeEstimate.deliverydays,
	};
};

const getDeliveryFee = async (weightToCheck: number, locationClass: string) => {
	const { data, error } = await supabaseClient
		.from('delivery_fee')
		.select(`*`)
		.lte('weightrangelower', weightToCheck)
		.gt('weightrangeupper', weightToCheck)
		.eq('class', locationClass)
		.single();

	if (error) {
		console.log(error);
		throw error;
	}

	return data;
};
