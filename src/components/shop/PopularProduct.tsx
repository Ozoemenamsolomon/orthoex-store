'use client';
import React from 'react';
import styled from 'styled-components';
import { Star, ChevronRight } from 'lucide-react';

// Types
type Product = {
  id: number;
  name: string;
  price: string;
  rating: number;
  image: string;
};

type StarRatingProps = {
  rating: number;
};

// Dummy product data (you can replace this with props or API)
const products: Product[] = [
  {
    id: 1,
    name: 'Epoxy Resin',
    price: '₦70,000.00',
    rating: 5,
    image: '/shop/sample2.png', // Use actual image path or imported image
  },
  {
    id: 2,
    name: 'Epoxy Resin',
    price: '₦70,000.00',
    rating: 3,
    image: '/shop/sample2.png',
  },
  {
    id: 3,
    name: 'Epoxy Resin',
    price: '₦70,000.00',
    rating: 5,
    image: '/shop/sample2.png',
  },
  {
    id: 4,
    name: 'Epoxy Resin',
    price: '₦70,000.00',
    rating: 4,
    image: '/shop/sample2.png',
  },
];

// Styled Components
const Section = styled.section`
  padding: 33px;
  max-width: 1200px;
  background: #fff;
  margin-top: 55px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #111;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SeeAll = styled.a`
  color: #FE7624;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;


const ProductCard = styled.div`
  flex: 0 0 calc((100% - 3 * 1.5rem) / 4);
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* left align horizontally */
  justify-content: flex-start; /* top align vertically */
  text-align: left;
  height: 350px;

  @media (max-width: 768px) {
    flex: 1 1 100%;
    height: auto;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* keep all left aligned */
  gap: 0.5rem;
  height: 100%;
  justify-content: flex-start; /* stack from the top */
`;



const ProductImage = styled.img`
  width: 100%;
  max-height: 164px;
  object-fit: contain;
  border-radius: 6px;
`;


const ProductName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.4rem;
`;

const Price = styled.div`
  font-size: 1.1rem;
  color: #001133;
  margin-bottom: 0.4rem;
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.85rem;
  color: #666;

  svg {
    margin-right: 2px;
    color: #f8b84e;
  }
`;

// Rating Component
const StarRating: React.FC<StarRatingProps> = ({ rating }) => (
  <>
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={16} fill={i < rating ? '#f8b84e' : 'none'} stroke="#f8b84e" />
    ))}
    <span style={{ marginLeft: 4 }}>(0)</span>
  </>
);

// Main Component
const PopularProduct: React.FC = () => {
  return (
    <Section>
      <Header>
        <Title>Popular Products</Title>
        <SeeAll href="#">
          See all <ChevronRight size={16} style={{ marginLeft: '4px' }} />
        </SeeAll>
      </Header>
      <ProductsGrid>
        {products.map(product => (
          <ProductCard key={product.id}>
            <ContentWrapper>
              <ProductImage src={product.image} alt={product.name} />
              <ProductName>{product.name}</ProductName>
              <Price>{product.price}</Price>
              <Rating>
                <StarRating rating={product.rating} />
              </Rating>
            </ContentWrapper>
          </ProductCard>

        ))}
      </ProductsGrid>
    </Section>
  );
};

export default PopularProduct;
