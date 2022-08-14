import product1 from '@assets/new/images/product1.jpg';
import Categories from '@components/Categories';
import { CTA } from '@components/Header';
import StayTunedSection from '@components/sections/StayTunedSection';
import SooSection from '@components/SooSection';
import { Container } from '@components/styled';
import Image from 'next/image';
import styled from 'styled-components';
import { categories } from '..';

const composite = () => {
	return (
		<Container verticalPadding={7} bg="white">
			composite
			<SooSection header={{ title: 'All Categories', align: 'left' }}>
				<Categories categories={categories} />
			</SooSection>
			<SooSection header={{ title: 'Popluar Products', align: 'left' }}>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
						gap: '2rem',
					}}
				>
					{Array.from({ length: 4 }).map((_, index) => (
						<ProductCardContainer key={`product_${index}`}>
							<div>
								<Image
									src={product1}
									layout="fill"
									objectFit="contain"
									alt="product"
								/>
							</div>
							<div>
								<h3>Product Name</h3>
								<p>₦70,000.00</p>
								<div>5555555</div>
								<CTA>ADD TO CART</CTA>
							</div>
						</ProductCardContainer>
					))}
				</div>
			</SooSection>
			<StayTunedSection />
		</Container>
	);
};

export default composite;

const ProductCardContainer = styled.div`
	> div:first-child {
		aspect-ratio: 210/164;
		position: relative;
	}

	> div:nth-child(2) {
		display: flex;
		flex-direction: column;
		padding: 1rem;
	}

	border-radius: 4px;
	transition: all 0.3s ease-in-out;

	button {
		opacity: 0;
	}

	&:hover {
		box-shadow: 8px 8px 13px rgb(0 0 0 / 7%);
		button {
			opacity: 1;
		}
	}
	h3 {
		font-size: 1.1rem;
		font-weight: normal;

		+ p {
			font-size: 2rem;
			font-weight: bold;
		}
	}
`;
