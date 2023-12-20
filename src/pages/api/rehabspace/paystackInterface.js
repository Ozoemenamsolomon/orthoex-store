export const handlePayment = (email, amount) => {
	let handler = PaystackPop.setup({
		key: '',
		email,
		amount: amount * 100,

		onClose: function () {
			alert('Window closed.');
		},

		callback: function (response) {
			let message = 'Payment complete! Reference: ' + response.reference;

			alert(message);
		},
	});

	handler.openIframe();
};
