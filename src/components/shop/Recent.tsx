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
    name: 'Polyester Resin',
    price: '₦70,000.00',
    rating: 4,
    image: '/resin.png', // Use actual image path or imported image
  },
  {
    id: 2,
    name: 'Polyester Resin',
    price: '₦70,000.00',
    rating: 4,
    image: '/resin.png',
  },
  {
    id: 3,
    name: 'Polyester Resin',
    price: '₦70,000.00',
    rating: 4,
    image: '/resin.png',
  },
  {
    id: 4,
    name: 'Polyester Resin',
    price: '₦70,000.00',
    rating: 4,
    image: '/resin.png',
  },
];

// Styled Components
const Section = styled.section`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
`;

const SeeAll = styled.a`
  color: #f60;
  font-size: 0.95rem;
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

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductCard = styled.div`
  flex: 1 1 calc(25% - 1rem);
  min-width: 200px;
  text-align: center;

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 6px;
`;

const ProductName = styled.div`
  margin-top: 0.8rem;
  font-weight: 600;
  font-size: 1rem;
`;

const Price = styled.div`
  font-size: 1.1rem;
  margin: 0.4rem 0;
  color: #001133;
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
const RecentlyViewed: React.FC = () => {
  return (
    <Section>
      <Header>
        <Title>Recently View</Title>
        <SeeAll href="#">
          See all <ChevronRight size={16} style={{ marginLeft: '4px' }} />
        </SeeAll>
      </Header>
      <ProductsGrid>
        {products.map(product => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <Price>{product.price}</Price>
            <Rating>
              <StarRating rating={product.rating} />
            </Rating>
          </ProductCard>
        ))}
      </ProductsGrid>
    </Section>
  );
};

export default RecentlyViewed;
