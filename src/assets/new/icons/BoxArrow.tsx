const BoxArrow: React.FC<{ rotate?: boolean; colour?: string }> = ({
	colour = 'currentColor',
	rotate,
}) => (
	<svg
		style={{ transform: rotate === true ? 'rotate(-0deg)' : 'rotate(-90deg)' }}
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M8.54714 13.046L14.5471 4.37938C14.6163 4.27936 14.6569 4.16232 14.6643 4.04092C14.6718 3.91953 14.6459 3.7984 14.5894 3.69067C14.533 3.58293 14.4482 3.49269 14.3441 3.42971C14.2401 3.36673 14.1208 3.33342 13.9991 3.33338L1.99914 3.33338C1.87746 3.3333 1.75807 3.36652 1.65393 3.42945C1.54978 3.49238 1.46484 3.58261 1.40832 3.69037C1.3518 3.79813 1.32585 3.9193 1.33328 4.04076C1.34071 4.16221 1.38124 4.27932 1.45047 4.37938L7.45047 13.046C7.51209 13.1343 7.59412 13.2064 7.68959 13.2562C7.78506 13.306 7.89114 13.332 7.99881 13.332C8.10648 13.332 8.21255 13.306 8.30802 13.2562C8.40349 13.2064 8.48552 13.1343 8.54714 13.046Z"
			fill={colour}
		/>
	</svg>
);

export default BoxArrow;