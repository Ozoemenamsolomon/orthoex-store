const Search = ({ colour = 'black' }) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M10.0674 19.5C15.0379 19.5 19.0674 15.4706 19.0674 10.5C19.0674 5.52944 15.0379 1.5 10.0674 1.5C5.09682 1.5 1.06738 5.52944 1.06738 10.5C1.06738 15.4706 5.09682 19.5 10.0674 19.5Z"
			stroke={colour}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M16.8174 17.25L22.0674 22.5"
			stroke={colour}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default Search;
