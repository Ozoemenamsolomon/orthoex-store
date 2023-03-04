import { UserProvider } from '@auth0/nextjs-auth0/client';
import { theme } from '@styles/theme';
import CartProvider from 'context/cart';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<CartProvider>
				<ThemeProvider theme={theme}>
					<Layout>
						<Component {...pageProps} />
						<ToastContainer />
					</Layout>
				</ThemeProvider>
			</CartProvider>
		</UserProvider>
	);
}
export default MyApp;

/*
<head>
<title>Leading healthcare device and equipment, Provider of Medical devices and equipment, serving all segments of healthcare market with a niche in Prosthetics, Orthopaedics, Physiotherapy and Rehabilitation systems and support. | Home ::</title>
<meta name="msvalidate.01" content="2B2E5D546865C86443857BC2482299B7">
<!-- for-mobile-apps -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="provider of Medical devices and equipment, serving all segments of healthcare market with a niche in Prosthetics, Orthopaedics, Physiotherapy and Rehabilitation systems and support, leading healthcare device and equipment">
<meta name="keywords" content="Medical devices and equipment, Prosthetics, Orthopaedics, Physiotherapy and Rehabilitation systems and support, leading healthcare device and equipment">
<meta name="robots" content="index, follow">
<meta name="googlebot" content="index, follow">
<meta name="google" content="nositelinkssearchbox">
<meta name="google" content="notranslate">
<meta name="google" content="notranslate">
<meta name="google-site-verification" content="2B2E5D546865C86443857BC2482299B7">
</head>
*/
