import { CategoryProps } from '@components/CategoryCard';
import PriceFilter, { PriceRange } from '@components/PriceFilter';
import { brands } from '@data/brands';
import { categories } from 'data/categories';
import { Rating as StarRating } from 'react-simple-star-rating';
import styled from 'styled-components';

export type FilterType = {
	category: string;
	brand: string;
	priceRange: PriceRange;
};

const FilterPanel: React.FC<{
	filter: FilterType;
	setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
	noCategory?: boolean;
}> = ({ filter, setFilter, noCategory }) => {
	const setHighPriceRange: React.ChangeEventHandler<HTMLInputElement> = e => {
		setFilter(prev => ({
			...prev,
			priceRange: { ...prev.priceRange, max: Number(e.target.value) },
		}));
	};
	const setLowPriceRange: React.ChangeEventHandler<HTMLInputElement> = e => {
		setFilter(prev => ({
			...prev,
			priceRange: { ...prev.priceRange, min: Number(e.target.value) },
		}));
	};

	const resetBrandFilter = () => setFilter(prev => ({ ...prev, brand: '' }));
	const resetCategoryFilter = () =>
		setFilter(prev => ({ ...prev, category: '' }));

	const selectBrandFilter: React.ChangeEventHandler<HTMLInputElement> = e => {
		setFilter(prev => ({
			...prev,
			brand: e.target.dataset.brand || '',
		}));
	};
	const selectCategoryFilter: React.ChangeEventHandler<
		HTMLInputElement
	> = e => {
		setFilter(prev => ({
			...prev,
			category: e.target.dataset.category || '',
		}));
	};

	const CategoryRadioOption: React.FC<CategoryProps> = ({ name, slug }) => {
		return (
			<label className="label" htmlFor={slug}>
				<input
					checked={slug === filter.category}
					type="radio"
					name={'category-selector'}
					id={slug}
					data-category={slug}
					onChange={selectCategoryFilter}
				/>
				{name}
			</label>
		);
	};

	return (
		<FilterPanelContainer>
			{!noCategory && (
				<FilterPanelSectionContainer>
					<FilterPanelSectionHeader>
						<h2>CATEGORY</h2>
						{filter.category && (
							<button onClick={resetCategoryFilter}>&#x1F5D9;</button>
						)}
					</FilterPanelSectionHeader>
					<div>
						{categories.map((category, index) => (
							<CategoryRadioOption key={`cat-option-${index}`} {...category} />
						))}
					</div>
				</FilterPanelSectionContainer>
			)}
			<FilterPanelSectionContainer>
				<FilterPanelSectionHeader>
					<h2>BRAND</h2>
					{filter.brand && (
						<button onClick={resetBrandFilter}>&#x1F5D9;</button>
					)}
				</FilterPanelSectionHeader>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '.5rem',
					}}>
					{brands.map(({ slug, name }, index) => (
						<label key={`brand-select-radio-${index}`}>
							<input
								checked={slug === filter.brand}
								onChange={selectBrandFilter}
								type="radio"
								name="brand"
								data-brand={slug}
								id={slug}
							/>
							<span>{name}</span>
						</label>
					))}
				</div>
			</FilterPanelSectionContainer>
			<FilterPanelSectionContainer>
				<FilterPanelSectionHeader>
					<h2>PRICE (₦)</h2>
					<button
						style={{
							color: 'var(--oex-orange)',
							background: 'none',
							border: 'none',
						}}>
						Apply
					</button>
				</FilterPanelSectionHeader>
				<PriceFilter
					{...{
						priceRange: filter.priceRange,
						setHighPriceRange,
						setLowPriceRange,
					}}
				/>
			</FilterPanelSectionContainer>
			<FilterPanelSectionContainer>
				<FilterPanelSectionHeader>
					<h2>PRODUCT RATING</h2>
				</FilterPanelSectionHeader>
				<div>
					{new Array(4).fill({}).map((_, index) => (
						<label
							key={`rating-filter-${index}`}
							style={{ display: 'flex', gap: '.2rem' }}>
							<input
								type="radio"
								name="rating-filter"
								id={'rating-filter-' + (4 - index).toString()}
								style={{ margin: '0' }}
							/>
							<StarRating
								size={16}
								initialValue={4 - index}
								readonly
								fillColor="var(--oex-yellow)"
							/>
							<span>&amp; above</span>
						</label>
					))}
				</div>
			</FilterPanelSectionContainer>
		</FilterPanelContainer>
	);
};

export default FilterPanel;

const FilterPanelContainer = styled.aside`
	position: sticky;
	top: 7rem;
	background-color: white;
	padding: 1rem;
	display: none;
	flex: 1;

	> div:nth-of-type(2) {
		> div:first-child > div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex: 1;
		}
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
		display: none;
	}
`;

const FilterPanelSectionContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding-block: 1rem;
	&:not(:last-child) {
		border-bottom: 1px solid var(--oex-grey);
	}
	&:first-child {
		padding-block-start: 0rem;
	}
	.label {
		display: block;
	}
`;

const FilterPanelSectionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
