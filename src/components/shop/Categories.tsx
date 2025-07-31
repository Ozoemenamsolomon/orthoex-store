
'use client'

import { useState } from 'react';
import styled from 'styled-components';
import { CheckCircle, Star, StarHalf, Heart, ShoppingCart, Eye } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const products = new Array(8).fill({
  name: 'Epoxy Polyester Resin',
  price: 170000,
  rating: 0,
  image: '/epoxy-resin.png',
});

const cheapProducts = new Array(3).fill({
  name: 'Polyester Resin',
  price: 70000,
  rating: 0,
  image: '/epoxy-resin.png',
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 3rem;

  @media(min-width: 1024px) {
    flex-direction: row;
  }
`;

const Sidebar = styled.aside`
  width: 100%;
  max-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #ffffff;
  padding: 40px 16px;
`;

const Section = styled.section`
  flex: 1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media(min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media(min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  transition: box-shadow 0.3s;
  cusor:pointer;

  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  }
`;

const Actions = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: none;
  gap: 0.5rem;

  ${ProductCard}:hover & {
    display: flex;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #fbbf24;
  margin-top: 0.25rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const HeaderText = styled.p`
 font-size: 18px;
 color: #0A0E2E;
 font-weight: 600;
`;

const BreadcrumbContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem 0;
  font-size: 14px;
  color: #888;
`;

const Crumb = styled.span<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#f97316' : '#555')};
  font-weight: ${({ active }) => (active ? '600' : 'normal')};
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Divider = styled.span`
  margin: 0 0.5rem;
  color: #ccc;
`;

export default function Categories() {
  const [priceRange, setPriceRange] = useState([200, 30000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const router = useRouter();
  const filterProducts = [...products, ...cheapProducts];

  return (
    <div>
      <BreadcrumbContainer aria-label="breadcrumb">
        <Crumb>Composites</Crumb>
        <Divider>&gt;&gt;</Divider>
        <Crumb>All Categories</Crumb>
        <Divider>&gt;&gt;</Divider>
        <Crumb active>Polyester Resin & Components</Crumb>
      </BreadcrumbContainer>
      
      <Container>
        <Sidebar>
          <div>
            <HeaderText className='HeaderText'>BRAND</HeaderText>
            <FilterGroup>
              <FilterLabel>
                <input type="checkbox" /> OEX Composite
              </FilterLabel>
              <FilterLabel>
                <input type="checkbox" /> Shangxix
              </FilterLabel>
            </FilterGroup>
          </div>

          <div>
            <h4>PRICE (₦)</h4>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                style={{ maxWidth: '80px' }}
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                style={{ maxWidth: '80px' }}
              />
              <button style={{ marginLeft: 'auto', background: '#ea580c', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>Apply</button>
            </div>
          </div>

          <div>
            <h4>PRODUCT RATING</h4>
            <FilterGroup>
              {[5, 4, 3, 2].map((rating) => (
                <FilterLabel key={rating} onClick={() => setSelectedRating(rating)}>
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === rating}
                    onChange={() => setSelectedRating(rating)}
                  />
                  {rating} ★ & above
                </FilterLabel>
              ))}
            </FilterGroup>
          </div>
        </Sidebar>

        <Section>
          <TitleRow>
            <p className=''>Polyester Resin & Components</p>
            <select>
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </TitleRow>

          <Grid>
            {filterProducts.map((product, i) => (
              <ProductCard key={i} onClick={() => router.push(`/shop/details/`)}>
                <Image src={product.image} alt={product.name} width={300} height={200} style={{ objectFit: 'contain', padding: '1rem' }} />
                <Actions>
                  <button style={{ background: '#fff', padding: '0.25rem', borderRadius: '9999px' }}><Eye size={18} /></button>
                  <button style={{ background: '#fff', padding: '0.25rem', borderRadius: '9999px' }}><ShoppingCart size={18} /></button>
                  <button style={{ background: '#fff', padding: '0.25rem', borderRadius: '9999px' }}><Heart size={18} /></button>
                </Actions>
                <div style={{ padding: '0.5rem' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1f2937', marginBottom: '0.25rem' }}>{product.name}</h3>
                  <p style={{ color: '#ea580c', fontWeight: 600, fontSize: '0.875rem' }}>₦{product.price.toLocaleString()}</p>
                  <Rating>
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={14} strokeWidth={1} />
                    ))}
                    <span style={{ color: '#6b7280', marginLeft: '0.25rem' }}>(0)</span>
                  </Rating>
                </div>
              </ProductCard>
            ))}
          </Grid>

          <Pagination>
            <button>⟨</button>
            <button style={{ background: '#ea580c', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>1</button>
            <button>2</button>
            <button>⟩</button>
          </Pagination>
        </Section>
      </Container>
    </div>

  );
}
