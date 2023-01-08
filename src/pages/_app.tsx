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
		<CartProvider>
			<ThemeProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
					<ToastContainer />
				</Layout>
			</ThemeProvider>
		</CartProvider>
	);
}
export default MyApp;
