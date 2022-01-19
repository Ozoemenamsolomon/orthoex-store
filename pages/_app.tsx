import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';

const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Script
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html:
						process.env.NODE_ENV === 'production'
							? `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `
							: '',
				}}
			/>
			<noscript>
				<iframe
					src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
					height="0"
					width="0"
					style={{ display: 'none', visibility: 'hidden' }}
				/>
			</noscript>
			<Component {...pageProps} />
		</>
	);
}
export default MyApp;
