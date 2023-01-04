import { theme } from '@styles/theme';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Layout from '../components/Layout';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Layout>
				<Component {...pageProps} />
				<ToastContainer />
			</Layout>
		</ThemeProvider>
	);
}
export default MyApp;
