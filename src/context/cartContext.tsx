import { createContext, useContext, useEffect, useRef, useState } from 'react';

const CartContext = createContext<CartContextType | null>(null);

export type CartState = { productVariantID: string; quantity: number }[];

type CartContextType = {
	cart: CartState;
	setQuantity: (productVariantID: string, quantity: number) => void;
	getQuantity: (productVariantID: string) => number;
};

export const CartProvider: React.FC = ({ children }) => {
	const [cart, setCart] = useState<CartState>([]);
	const firstUpdate = useRef(true);

	useEffect(() => {
		const cartFromLocalStorage = localStorage.getItem('cart');

		if (cartFromLocalStorage) {
			setCart(JSON.parse(cartFromLocalStorage));
		}
	}, []);

	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const removeFromCart = (productVariantID: string) => {
		setCart(cart.filter(item => item.productVariantID !== productVariantID));
	};

	const setQuantity = (productVariantID: string, quantity: number) => {
		if (quantity === 0) {
			return removeFromCart(productVariantID);
		}

		const itemInCart = cart.find(
			item => item.productVariantID === productVariantID,
		);

		if (itemInCart) {
			setCart(
				cart.map(item =>
					item.productVariantID === productVariantID
						? { ...item, quantity }
						: item,
				),
			);
		} else {
			setCart([...cart, { productVariantID, quantity }]);
		}
	};

	const getQuantity = (productVariantID: string) => {
		const itemInCart = cart.find(
			item => item.productVariantID === productVariantID,
		);

		if (itemInCart) {
			return itemInCart.quantity;
		}

		return 0;
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				setQuantity,
				getQuantity,
			}}>
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
