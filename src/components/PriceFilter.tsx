import { useState } from 'react';

const PriceFilter = () => {
	const [priceRangeHigh, setPriceRangeHigh] = useState(20000);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<input
				style={{ accentColor: 'var(--oex-orange)' }}
				type="range"
				name="price-filter"
				id="price-filter"
				value={priceRangeHigh}
				max={21000}
				onChange={(e) => {
					setPriceRangeHigh(Number(e.target.value));
				}}
			/>
			<div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
				<input
					style={{ flex: '1', contain: 'strict', padding: '.5rem' }}
					type="number"
					name="price-filter-start"
					value={200}
				></input>
				<span>-</span>
				<input
					style={{ flex: '1', contain: 'strict', padding: '.5rem' }}
					type="number"
					name="price-filter-end"
					max={21000}
					value={priceRangeHigh}
					onChange={(e) => {
						setPriceRangeHigh(Number(e.target.value));
					}}
				></input>
			</div>
		</div>
	);
};

export default PriceFilter;
