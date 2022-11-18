const DataSheet = ({ colour = "currentColor" }) => (
	<svg
		width="20"
		height="25"
		viewBox="0 0 20 25"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M15.275 7.3959L10.025 2.1459C9.875 1.9959 9.725 1.9209 9.5 1.9209H2C1.175 1.9209 0.5 2.5959 0.5 3.4209V21.4209C0.5 22.2459 1.175 22.9209 2 22.9209H14C14.825 22.9209 15.5 22.2459 15.5 21.4209V7.9209C15.5 7.6959 15.425 7.5459 15.275 7.3959ZM9.5 3.7209L13.7 7.9209H9.5V3.7209ZM14 21.4209H2V3.4209H8V7.9209C8 8.7459 8.675 9.4209 9.5 9.4209H14V21.4209Z"
			fill={colour}
		/>
		<path
			d="M3.5 16.9209H12.5V18.4209H3.5V16.9209ZM3.5 12.4209H12.5V13.9209H3.5V12.4209Z"
			fill={colour}
		/>
	</svg>
);

export default DataSheet;
