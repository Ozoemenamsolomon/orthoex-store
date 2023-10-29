const Location = ({ colour = 'currentColor' }) => (
	<svg
		width="12"
		height="16"
		viewBox="0 0 12 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M6.74062 15.6C8.34375 13.5938 12 8.73125 12 6C12 2.6875 9.3125 0 6 0C2.6875 0 0 2.6875 0 6C0 8.73125 3.65625 13.5938 5.25938 15.6C5.64375 16.0781 6.35625 16.0781 6.74062 15.6ZM6 8C4.89687 8 4 7.10313 4 6C4 4.89687 4.89687 4 6 4C7.10313 4 8 4.89687 8 6C8 7.10313 7.10313 8 6 8Z"
			fill={colour}
		/>
	</svg>
);

export default Location;
