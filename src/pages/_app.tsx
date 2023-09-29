import { UserProvider } from '@auth0/nextjs-auth0/client';
import { theme } from '@styles/theme';
import { CartProvider } from 'context/cartContext';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
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
					<NextTopLoader
						color="var(--oex-orange)"
						showSpinner={false}
						crawlSpeed={100}
					/>
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
								gtag('config', '${GA_MEASUREMENT_ID}', {
									page_path: window.location.pathname,
								});
							`}
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
<meta name="google-site-verification" content="2B2E5D546865C86443857BC2482299B7">
*/
