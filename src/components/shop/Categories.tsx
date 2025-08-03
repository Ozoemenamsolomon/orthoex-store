'use client'

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Star, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GridForm, ListForm } from 'constant/icon';

const products = new Array(9).fill({
  name: 'Epoxy Polyester Resin',
  price: 170000,
  rating: 4,
  image: '/shop/sample.png',
});


const MainContainer = styled.div`
  padding: 39px 155px;

   @media (max-width: 779px) {
       padding: 39px 12px;
    }
`;

const Container = styled.div`
  margin-top: 39px;
  display: flex;
  flex-direction: column;
  gap: 22px;

  @media(min-width: 1024px) {
    flex-direction: row;
  }
`;

const Sidebar = styled.aside`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #ffffff;
  padding: 40px 16px;

  @media(min-width: 780px) {
     max-width: 290px;
  }
`;

const Section = styled.section`
  flex: 1;
  padding: 32px;
  background-color: #ffffff;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  padding-top:27px;


  @media(min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media(min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProductCard = styled.div`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
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
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  font-size: 14px;
  color: #888;

    @media (max-width: 480px) {
      font-size: 10px;
      display: flex;
      flex-direction: row;
    }
`;

const Crumb = styled.span<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#FE7624' : '#555')};
  font-weight: ${({ active }) => (active ? '600' : 'normal')};
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 9px;
  }
`;

const Divider = styled.span`
  margin: 0 0.5rem;
  color: #ccc;
`;

const PriceWrapper = styled.div`
  max-width: 400px;
  padding: 1rem;
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 0.5rem;

  span {
    color: #FE7624;
    cursor: pointer;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  height: 2px;
  background: #FE7624;
  margin-bottom: 1rem;
`;

const RangeInput = styled.input.attrs({ type: "range" })`
  position: absolute;
  width: 100%;
  height: 2px;
  background: transparent;
  pointer-events: none;
  appearance: none;

  &::-webkit-slider-thumb {
    pointer-events: auto;
    appearance: none;
    height: 14px;
    width: 14px;
    background: #FE7624;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    position: relative;
    z-index: 2;
  }

  &::-moz-range-thumb {
    pointer-events: auto;
    appearance: none;
    height: 14px;
    width: 14px;
    background: #FE7624;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    z-index: 2;
  }
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1.5px solid #FE7624;
    border-radius: 6px;
    font-size: 14px;
    text-align: center;
  }

  .separator {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #bbb;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeaderTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

   @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #0d1136;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
   font-size: 20px;
  font-weight: 500;
  color: #0d1136;

  span {
    font-weight: 400;
  }

  select {
    border: none;
    font-size: 1rem;
    color: #666;
    background: transparent;
    appearance: none;
    padding-right: 1.5rem;
    position: relative;
  }

  svg {
    width: 1rem;
    height: 1rem;
    margin-left: -1.25rem;
    pointer-events: none;
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #cfcfcf;
  border-top: 1px solid #cfcfcf;
  gap: 0.5rem;
  flex-wrap: wrap; /* Optional: prevents squishing on small screens */
`;

const ProductCount = styled.p`
  font-size: 0.875rem;
  color: #c0c0c0;
  margin: 0; /* ✅ remove default paragraph margin */
  line-height: 1; /* ✅ for tighter alignment */
`;


const ViewIcons = styled.div`
  display: flex;
  gap: 4px;
  align-items: center; /* ✅ make sure icons are aligned too */
`;


const ViewButton = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
    stroke: ${({ active }) => (active ? "#f57224" : "#666")};
  }
`;


const AdBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
  width: 100%;

  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const PriceTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #0A0E2E;
`;

const PriceImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

   Image {
    max-width: 100%;
    height: auto;
  }
`;

const PriceValue = styled.p`
 font-size: 16px;
  font-weight: 400;
  margin-bottom: 6px;
  color: #0A0E2E;
`;

export default function Categories() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const router = useRouter();
  const filterProducts = [...products];
  const [min, setMin] = useState<number>(200);
  const [max, setMax] = useState<number>(30000);
  const [view, setView] = useState<"list" | "grid">("grid");
  const isDesktop = () => typeof window !== 'undefined' && window.innerWidth >= 1024;

  const MIN_LIMIT = 0;
  const MAX_LIMIT = 50000;

  const handleMinChange = (value: number) => {
    setMin(Math.min(value, max - 1000));
  };

  const handleMaxChange = (value: number) => {
    setMax(Math.max(value, min + 1000));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setView("grid"); // default view for mobile
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MainContainer>
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

          <PriceWrapper>
            <LabelRow>
              <div>PRICE (₦)</div>
              <span>Apply</span>
            </LabelRow>

            <SliderContainer>
              <RangeInput
                min={MIN_LIMIT}
                max={MAX_LIMIT}
                value={min}
                onChange={(e) => handleMinChange(Number(e.target.value))}
              />
              <RangeInput
                min={MIN_LIMIT}
                max={MAX_LIMIT}
                value={max}
                onChange={(e) => handleMaxChange(Number(e.target.value))}
              />
            </SliderContainer>

            <InputRow>
              <input
                type="number"
                value={min}
                onChange={(e) => handleMinChange(Number(e.target.value))}
              />
              <span className="separator">–</span>
              <input
                type="number"
                value={max}
                onChange={(e) => handleMaxChange(Number(e.target.value))}
              />
            </InputRow>
          </PriceWrapper>

          <div>
            <h4>PRODUCT RATING</h4>
            <FilterGroup>
              {[5, 4, 3, 2].map((rating) => (
                <FilterLabel key={rating} onClick={() => setSelectedRating(rating)}>
                  <Rating>
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={14} strokeWidth={1} />
                    ))}
                  </Rating>
                  & above
                </FilterLabel>
              ))}
            </FilterGroup>
          </div>
        </Sidebar>

        <Section>
          <HeaderWrapper>
            <HeaderTopRow>
              <HeaderTitle>Polyester Resin & Components</HeaderTitle>
              <SortContainer>
                <span>Sort by:</span>
                <select defaultValue="popularity" style={{ outline: 'none' }}>
                  <option value="popularity">Popularity</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                </select>
                <ChevronDown />
              </SortContainer>
            </HeaderTopRow>
            <BottomRow>
              <ProductCount>Showing 8 Products</ProductCount>
              <ViewIcons>
                <ViewButton active={view === "list"} onClick={() => isDesktop() && setView("list")}>
                  <GridForm />
                </ViewButton>
                <ViewButton active={view === "grid"} onClick={() => isDesktop() && setView("grid")}>
                  <ListForm />
                </ViewButton>

              </ViewIcons>
            </BottomRow>
          </HeaderWrapper>

          <ProductGrid>
            {filterProducts.map((product, i) => (
              <ProductCard key={i} onClick={() => router.push(`/shop/details/`)}>
                <PriceImage>
                  <Image src={product.image} alt={product.name} width={210} height={164} style={{ objectFit: 'contain' }} />
                </PriceImage>

                <div style={{ padding: '0.5rem' }}>
                  <PriceTitle>{product.name}</PriceTitle>
                  <PriceValue>₦{product.price.toLocaleString()}</PriceValue>
                  <Rating>
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={14} strokeWidth={1} />
                    ))}
                    <span style={{ color: '#6b7280', marginLeft: '0.25rem' }}>(0)</span>
                  </Rating>
                </div>
              </ProductCard>
            ))}
          </ProductGrid>

          <Pagination>
            <button>⟨</button>
            <button style={{ background: '#ea580c', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>1</button>
            <button>2</button>
            <button>⟩</button>
          </Pagination>
        </Section>
      </Container>

      <AdBanner>
        <Image
          src="/shop/ads.png"
          alt="Banner"
          width={1130}
          height={360}
          style={{ width: '100%', height: 'auto' }} // ✅ Key to make it responsive
        />
      </AdBanner>

    </MainContainer>
  );
}
