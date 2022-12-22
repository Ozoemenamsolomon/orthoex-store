/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: ['upload.wikimedia.org', 'www.google.com', 'google.com'],
	},
};
