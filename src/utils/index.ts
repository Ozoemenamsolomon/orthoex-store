export const formatDate: (dateTime: Date) => string = dateTime => {
	return dateTime.toLocaleDateString('en-NG', {
		dateStyle: 'long',
	});
};

export const slugifyName = (name: string) =>
	name.toLowerCase().replace(/\s/g, '-').replace(/-+/g, '-');

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
	const diffInDays = Math.floor(
		(Number(end) - Number(start)) / oneDay
	);
	// Difference between same day returns, 0 days, adding 1 to make it 1 day
	return diffInDays + 1;
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

type DebounceFunction = (...args: any[]) => void;

export function debounce<T extends DebounceFunction>(
	func: T,
	delay: number,
): (...args: Parameters<T>) => void {
	let timeoutId: NodeJS.Timeout;

	return function (...args: Parameters<T>) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
}
export const getProductTotalWeight = (
	products: { variant: { weightInGram: any } }[],
) => {
	return products.reduce(
		(acc: number, prod) =>
			prod?.variant?.weightInGram
				? acc + Number(prod?.variant?.weightInGram)
				: 0,
		0,
	);
};
