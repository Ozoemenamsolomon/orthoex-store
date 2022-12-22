import 'styled-components';
import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		breakpoints: { above: { sm: string; md: string; lg: string; xl: string } };
	}
}

export const theme: DefaultTheme = {
	breakpoints: {
		above: {
			sm: '(min-width: 640px)',
			md: '(min-width: 768px)',
			lg: '(min-width: 1024px)',
			xl: '(min-width: 1280px)',
		},
	},
};
