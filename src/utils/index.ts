export const formatDate: (dateTime: Date) => string = dateTime => {
	return dateTime.toLocaleDateString("en-NG", {
		dateStyle: "long",
	});
};

export const formatTime: (dateTime: Date) => string = dateTime => {
	return dateTime.toLocaleTimeString("en-NG", {
		hour12: true,
		hour: "2-digit",
		minute: "2-digit",
	});
};

export const formatPrice: (price: number) => string = price => {
	return Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
	}).format(price);
};
