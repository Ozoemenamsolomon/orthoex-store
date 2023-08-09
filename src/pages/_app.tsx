import { UserProvider } from '@auth0/nextjs-auth0/client';
import { theme } from '@styles/theme';
import { CartProvider } from 'context/cartContext';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
	return (
		<UserProvider>
			<CartProvider>
				<ThemeProvider theme={theme}>
					<Layout>
						{process.env.NODE_ENV === 'production' && GA_MEASUREMENT_ID && (
							<>
								<Script
									src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
									strategy="afterInteractive"
								/>
								<Script id="google-analytics">
									{`
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', 'GA_MEASUREMENT_ID');`}
								</Script>
								{/* include paystack */}
								<Script
									src="https://js.paystack.co/v1/inline.js"
									strategy="afterInteractive"></Script>
							</>
						)}
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
