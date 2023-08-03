import { ProductDataType } from '@data/productsData';

export const formatDate: (dateTime: Date) => string = dateTime => {
	return dateTime.toLocaleDateString('en-NG', {
		dateStyle: 'long',
	});
};

export const formatTime: (dateTime: Date) => string = dateTime => {
	return dateTime.toLocaleTimeString('en-NG', {
		hour12: true,
		hour: '2-digit',
		minute: '2-digit',
	});
};

export function calculateDateDifference(
	startDate: string,
	endDate: string,
): number {
	const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

	const start = new Date(startDate);
	const end = new Date(endDate);

	// Calculate the difference in days
	const diffInDays = Math.round(
		Math.abs((start.getTime() - end.getTime()) / oneDay),
	);

	return diffInDays;
}

export const formatPrice: (price: number) => string = price => {
	return Intl.NumberFormat('en-NG', {
		style: 'currency',
		currency: 'NGN',
	}).format(price);
};

export const formatGramm = new Intl.NumberFormat('en-US', {
	style: 'unit',
	unit: 'gram',
	notation: 'compact',
	unitDisplay: 'narrow',
});

export const getPrice = (
	variants: ProductDataType['variants'],
	custier: string,
) => {
	const variant = variants.find(variant =>
		variant.prices.find(price => price.custier === custier),
	);

	return (
		variant?.prices.find(price => price.custier === custier)?.priceInKobo ||
		111111.11
	);
};
