const ShoppingCart = ({
	colour = 'black',
	totalItems,
}: {
	colour?: string;
	totalItems?: number;
}) => (
	<svg
		width="26"
		height="24"
		viewBox="0 0 26 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<g clipPath="url(#clip0_571_399)">
			<path
				d="M9.98457 21.3334C10.8625 21.3334 11.5741 20.6618 11.5741 19.8334C11.5741 19.0049 10.8625 18.3334 9.98457 18.3334C9.10669 18.3334 8.39502 19.0049 8.39502 19.8334C8.39502 20.6618 9.10669 21.3334 9.98457 21.3334Z"
				fill={colour}
			/>
			<path
				d="M19.6418 21.3334C20.5197 21.3334 21.2314 20.6618 21.2314 19.8334C21.2314 19.0049 20.5197 18.3334 19.6418 18.3334C18.7639 18.3334 18.0522 19.0049 18.0522 19.8334C18.0522 20.6618 18.7639 21.3334 19.6418 21.3334Z"
				fill={colour}
			/>
			<path
				d="M16.5122 4.66671C16.4801 4.44577 16.4635 4.22305 16.4628 4.00004C16.4635 3.77703 16.4801 3.55431 16.5122 3.33337H8.68457L9.14377 4.66671H16.5122Z"
				fill={colour}
			/>
			<path
				d="M21.7612 9.00003H21.4645L20.5814 12.6667H9.98436L6.7558 3.02003C6.72088 2.91767 6.66024 2.8248 6.57904 2.74935C6.49785 2.67389 6.39852 2.61809 6.28953 2.5867L3.39301 1.7467C3.30395 1.72087 3.21037 1.71185 3.11761 1.72015C3.02485 1.72846 2.93474 1.75392 2.85241 1.79509C2.68613 1.87823 2.56167 2.02029 2.5064 2.19003C2.45112 2.35977 2.46957 2.54328 2.55767 2.70018C2.64578 2.85709 2.79633 2.97454 2.9762 3.0267L5.51242 3.76003L8.7551 13.4267L7.5965 14.32L7.50466 14.4067C7.21807 14.7184 7.05563 15.1146 7.04531 15.5271C7.03499 15.9396 7.17745 16.3426 7.44814 16.6667C7.64069 16.8877 7.88538 17.0631 8.16262 17.1788C8.43986 17.2946 8.74196 17.3475 9.04476 17.3334H20.8357C21.0231 17.3334 21.2028 17.2631 21.3352 17.1381C21.4677 17.0131 21.5422 16.8435 21.5422 16.6667C21.5422 16.4899 21.4677 16.3203 21.3352 16.1953C21.2028 16.0703 21.0231 16 20.8357 16H8.93172C8.85037 15.9974 8.77111 15.975 8.70159 15.9351C8.63208 15.8951 8.57467 15.8389 8.53489 15.7719C8.49512 15.7048 8.47434 15.6293 8.47455 15.5525C8.47476 15.4757 8.49596 15.4002 8.5361 15.3334L10.2387 14H21.1465C21.3099 14.0038 21.4695 13.954 21.5983 13.8592C21.7271 13.7644 21.8171 13.6304 21.853 13.48L22.9622 8.87337C22.5683 8.95861 22.1653 9.00111 21.7612 9.00003Z"
				fill={colour}
			/>
			<path
				d="M21.7613 7.33329C23.7122 7.33329 25.2937 5.84091 25.2937 3.99996C25.2937 2.15901 23.7122 0.666626 21.7613 0.666626C19.8105 0.666626 18.229 2.15901 18.229 3.99996C18.229 5.84091 19.8105 7.33329 21.7613 7.33329Z"
				fill="#E25C5C"></path>
			<text
				x="5.5"
				y="19.5"
				fontFamily="Arial"
				fontSize="12"
				fill="white"
				textAnchor="middle"
				alignmentBaseline="middle"
				stroke="white"
				strokeWidth="0.5px">
				{totalItems}
			</text>
		</g>
		<defs>
			<clipPath id="clip0_571_399">
				<rect
					width="25.4328"
					height="24"
					fill={colour}
					transform="translate(0.567383)"
				/>
			</clipPath>
		</defs>
	</svg>
);

export default ShoppingCart;
