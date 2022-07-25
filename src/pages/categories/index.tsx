import React from 'react';
import Categories from '../../components/Categories';
import StayTunedSection from '../../components/sections/StayTunedSection';
import SooSection from '../../components/SooSection';
import { Container } from '../../components/styled';
import { categories } from '../composites';

const composite = () => {
	return (
		<Container verticalPadding={7} bg="white">
			composite
			<SooSection>
				<h2>All Categories</h2>
				<Categories categories={categories} />
			</SooSection>
			<StayTunedSection />
		</Container>
	);
};

export default composite;
