import { ProductDataType } from '@data/productsData';
import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext<CartContextType | null>(null);

type CartState = {
	cart: { productCode: string; count: number }[];
};

type CartAction =
	| { type: 'ADD_TO_CART'; payload: ProductDataType }
	| { type: 'REMOVE_FROM_CART'; payload: string };

type CartContextType = {
	state: CartState;
	dispatch: React.Dispatch<CartAction>;
};

const cartReducer = (state: CartState, action: CartAction) => {
	switch (action.type) {
		case 'ADD_TO_CART': {
			const { code, variants } = action.payload;
			const productCode = `${code}-${variants[0]?.id}`;
			const product = state.cart.find(item => item.productCode === productCode);

			return {
				...state,
				cart: product
					? state.cart.map(item =>
							item.productCode === productCode
								? { ...item, count: item.count + 1 }
								: item,
					  )
					: [...state.cart, { productCode, count: 1 }],
			};
		}
		case 'REMOVE_FROM_CART':
			return {
				...state,
				cart: state.cart.filter(item => item.productCode !== action.payload),
			};

		default:
			return state;
	}
};

export const CartProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, {
		cart: [],
	});
	console.log({ state });

	return (
		<CartContext.Provider value={{ state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}

	return context;
};
