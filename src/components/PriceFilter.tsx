import styled from 'styled-components';

export type PriceRange = {
	min: number;
	max?: number;
};

const PriceFilter: React.FC<{
	priceRange: PriceRange;
	setHighPriceRange: React.ChangeEventHandler<HTMLInputElement>;
	setLowPriceRange: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ priceRange, setHighPriceRange, setLowPriceRange }) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<input
				style={{ accentColor: 'var(--oex-orange)' }}
				type="range"
				name="price-filter"
				id="price-filter"
				value={priceRange.max}
				max={21000}
				min={priceRange.min}
				onChange={setHighPriceRange}
			/>
			<div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
				<PriceInput
					type="number"
					name="price-filter-start"
					value={priceRange.min}
					max={priceRange.max}
					placeholder="Min"
					onChange={setLowPriceRange}></PriceInput>
				<span>-</span>
				<PriceInput
					type="number"
					name="price-filter-end"
					max={21000}
					value={priceRange.max}
					min={priceRange.min}
					placeholder="Max"
					onChange={setHighPriceRange}></PriceInput>
			</div>
		</div>
	);
};

export default PriceFilter;

const PriceInput = styled.input`
	flex: 1;
	contain: strict;
	padding: 0.5rem;
	border: 1px solid #f3f3f3;
	border-radius: 4px;

	&:focus {
		border-color: var(--oex-orange);
		outline-color: var(--oex-orange);
	}
`;
