import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';

const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=G-JJF85CLTXB`}
			/>
			<Script
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html:
						process.env.NODE_ENV === 'production'
							? `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
						  
							gtag('config', 'G-JJF85CLTXB');
          `
							: '',
				}}
			/>
			<Component {...pageProps} />
		</>
	);
}
export default MyApp;
