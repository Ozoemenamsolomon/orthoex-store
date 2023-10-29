import { getProductsByMultipleIDs } from '@data/client';
import { ProductType } from '@data/products';
import { useRouter } from 'next/router';
import {
	ChangeEventHandler,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

const CartContext = createContext<CartContextType | null>(null);

export type CartState = { productVariantID: string; quantity: number }[];
type AddressType = {
	fullName: string;
	phone: string;
	streetAdress: string;
	state: string;
	lga: string;
	deliveryOption: string;
};

type CartContextType = {
	cart: CartState;
	setQuantity: (productVariantID: string, quantity: number) => void;
	getQuantity: (productVariantID: string) => number;
	checkout: (address: any) => void;
	checkoutSingleProduct: (productVariantID: string) => void;
	cartProductDetails?: ProductType[];
	address: AddressType;
	deliveryFee: number;
	handleAddressChange: ChangeEventHandler<
		HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
	>;
};

export const CartProvider: React.FC = ({ children }) => {
	const [cart, setCart] = useState<CartState>([]);
	const firstUpdate = useRef(true);
	const router = useRouter();

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

	const [address, setAddress] = useState<AddressType>({
		fullName: '',
		phone: '',
		streetAdress: '',
		state: '',
		lga: '',
		deliveryOption: 'waybill',
	});
	const [deliveryFee, setDeliveryFee] = useState(0);

	const handleChange: ChangeEventHandler<
		HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
	> = e => {
		setAddress({ ...address, [e.target.name]: e.target.value });
		if (e.target.value && e.target.name === 'state') {
			setDeliveryFee(0);
		}

		if (e.target.value && e.target.name === 'lga') {
			//  estimate delivery fee
			const estimatedDeliveryFee = 0;
			fetch(`/api/estimate-delivery`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					lga: e.target.value,
					cart,
				}),
			})
				.then(res => res.json())
				.then(data => {
					setDeliveryFee(data.deliveryFee);
				});

			setDeliveryFee(estimatedDeliveryFee);
		}
	};

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

	const checkout = async (address: any) => {
		if (cart.length < 1) {
			return;
		}

		try {
			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ cart, address }),
			});
			if (!response.ok) {
				console.log(response.json());
				throw new Error("couldn't checkout cart");
			}
			const { reference } = await response.json();

			setCart([]);

			router.replace(`/composites/checkout/${reference}`);
		} catch (error) {
			console.log(error);
		}
	};

	const checkoutSingleProduct = async (productVariantID: string) => {
		let newCart: CartState = [
			{
				productVariantID,
				quantity: 1,
			},
		];
		// get product with productVariantID from cart
		const cartProduct = cart.find(
			item => item.productVariantID === productVariantID,
		);

		if (cartProduct) {
			newCart = [cartProduct];
		}

		try {
			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ cart: newCart }),
			});

			if (!response.ok) {
				console.log(response.json());
				throw new Error("couldn't checkout cart");
			}
			const { reference } = await response.json();

			removeFromCart(productVariantID);

			router.replace(`/composites/checkout/${reference}`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				checkout,
				setQuantity,
				getQuantity,
				checkoutSingleProduct,
				address,
				deliveryFee,
				handleAddressChange: handleChange,
			}}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = (
	options?: { withProductDetails: boolean } | undefined,
) => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}

	// TODO: look into this, it's inconsistent
	const [cartProducts, setCartProducts] = useState<ProductType[]>([]);

	useEffect(() => {
		if (options?.withProductDetails) {
			getCartProductsData();
		}
	}, [context.cart]);

	const getCartProductsData = async () => {
		const products = await getProductsByMultipleIDs(context.cart);
		setCartProducts(products);
	};

	const transformedProducts = cartProducts.map(product => ({
		...product,
		quantity:
			context.cart.find(
				item => item.productVariantID === product.variantID.toString(),
			)?.quantity || 0,
	}));

	return {
		...context,
		cartProducts: transformedProducts,
	};
};
