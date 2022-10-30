import { CategoryProps } from '@components/CategoryCard';
import PriceFilter from '@components/PriceFilter';
import { brands } from '@data/brands';
import { categories } from 'data/categories';
import StarRating from 'react-svg-star-rating';
import styled from 'styled-components';

const filterSections = [
	{
		header: (
			<>
				<h2>PRICE (₦)</h2>
				<button
					style={{
						color: 'var(--oex-orange)',
						background: 'none',
						border: 'none',
					}}>
					Apply
				</button>
			</>
		),
		content: <PriceFilter />,
	},
	{
		header: <h2>PRODUCT RATING</h2>,
		content: (
			<div>
				{new Array(4).fill({}).map((_, index) => (
					<label style={{ display: 'flex', gap: '.2rem' }}>
						<input
							type="radio"
							name="rating-filter"
							id={'rating-filter-' + (4 - index).toString()}
							style={{ margin: '0' }}
						/>
						<StarRating
							size={16}
							initialRating={4 - index}
							isReadOnly
							activeColor="var(--oex-yellow)"
						/>
						<span>&amp; above</span>
					</label>
				))}
			</div>
		),
	},
];

const FilterPanel: React.FC<{
	filter: { category: string; brand: string };
	setFilter: React.Dispatch<
		React.SetStateAction<{ category: string; brand: string }>
	>;
	noCategory?: boolean;
}> = ({ filter, setFilter, noCategory }) => {
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

	console.log({ filter });

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
						{categories.map(category => (
							<CategoryRadioOption {...category} />
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
					{brands.map(({ slug, name }) => (
						<label>
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
			{filterSections.map(({ header, content }) => (
				<FilterPanelSectionContainer>
					<FilterPanelSectionHeader>{header}</FilterPanelSectionHeader>
					{content}
				</FilterPanelSectionContainer>
			))}
		</FilterPanelContainer>
	);
};

export default FilterPanel;

const FilterPanelContainer = styled.aside`
	> div:nth-of-type(2) {
		> div:first-child > div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex: 1;
		}
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
