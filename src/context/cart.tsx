import { createContext, useContext, useState } from 'react';

// cart functions
// - add to cart
// - remove from cart
// - update cart
// - get cart

type CartContextType = {
	addToCart: (productCode: string) => void;
	removeFromCart: (productCode: string) => void;
};

const CartContext = createContext<CartContextType>({
	addToCart: () => {},
	removeFromCart: () => {},
});

export const useCart = () => useContext(CartContext);

type CartItem = {
	productCode: string;
	quantity: number;
};

const CartProvider: React.FC = ({ children }) => {
	const [cart, setCart] = useState<CartItem[]>([]);

	const addToCart = (productCode: string) => {
		const productInCart = cart.find(item => item.productCode === productCode);

		if (productInCart) {
			const updatedCart = cart.map(item => {
				if (item.productCode === productCode) {
					return {
						...item,
						quantity: item.quantity + 1,
					};
				}
				return item;
			});
			setCart(updatedCart);
		} else {
			setCart([...cart, { productCode, quantity: 1 }]);
		}
	};

	const removeFromCart = (productCode: string) => {
		const updatedCart = cart.filter(item => item.productCode !== productCode);
		setCart(updatedCart);
	};

	return (
		<CartContext.Provider value={{ addToCart, removeFromCart }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
