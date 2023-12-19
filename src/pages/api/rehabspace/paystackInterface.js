export const handlePayment = (email, amount) => {
	let handler = PaystackPop.setup({
		key: 'pk_test_5e645036a30c538419faf8f67e5e493252f1a770',
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

pages / api / payment.js;
