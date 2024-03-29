import ColorPigment from '@assets/new/images/home/color_pigment.jpg';
import EpoxyResins from '@assets/new/images/home/epoxy_resin.jpg';
import Fabrication from '@assets/new/images/home/fabrication_materials.jpg';
import Orthoses from '@assets/new/images/home/orthoses.jpg';
import PolyesterResins from '@assets/new/images/home/polyester_resins.jpg';
import Protheses from '@assets/new/images/home/prosthesis.jpg';
import SiliconMould from '@assets/new/images/home/silicon_mould.jpg';
import SyntheticFibre from '@assets/new/images/home/synthetic_fibre.jpg';
import { StaticImageData } from 'next/image';
import styled from 'styled-components';
import SwiperCore, {
	A11y,
	Grid,
	Navigation,
	Pagination,
	Scrollbar,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductVerticalCard from './ProductVerticalCard';
import SooSection from './SooSection';

export interface VerticalType {
	title: string;
	image: StaticImageData;
	link: string;
}

SwiperCore.use([Pagination, Navigation, Scrollbar, A11y, Grid]);

const productVerticalData: VerticalType[] = [
	{
		title: 'synthetic fibre',
		image: SyntheticFibre,
		link: '',
	},
	{
		title: 'epoxy resin',
		image: EpoxyResins,
		link: '',
	},
	{
		title: 'color pigment',
		image: ColorPigment,
		link: '',
	},
	{
		title: 'silicon mould',
		image: SiliconMould,
		link: '',
	},
	{
		title: 'orthoses',
		image: Orthoses,
		link: '',
	},
	{
		title: 'prostheses',
		image: Protheses,
		link: '',
	},
	{
		title: 'fabrication materials',
		image: Fabrication,
		link: '',
	},
	{
		title: 'polyester resin',
		image: PolyesterResins,
		link: '',
	},
];

function ProductVertical() {
	return (
		<ProductVerticalWrapper id="product-vertical">
			<SooSection
				header={{
					title: 'Which of our product vertical is relevant for you?',
					subtitle:
						'Take full advantage of our expert knowledge and growing product portfolio in these domains for your specific field of application:',
				}}>
				<Swiper
					className="mySwiper"
					navigation={true}
					pagination={{ clickable: true }}
					slidesPerView={3}
					grid={{ rows: 1 }}>
					<StyledProductSection>
						{productVerticalData.map((product, index) => (
							<SwiperSlide key={index}>
								<ProductVerticalCard
									image={product.image}
									key={`${index}-${product}`}
									link={product.link}
									title={product.title}
								/>
							</SwiperSlide>
						))}
					</StyledProductSection>
				</Swiper>
			</SooSection>
		</ProductVerticalWrapper>
	);
}

export default ProductVertical;

const StyledProductSection = styled.div``;
const ProductVerticalWrapper = styled.div`
	.swiper-pagination-bullet-active {
		background: var(--oex-orange) !important;
	}

	.swiper-pagination {
		margin-top: 2rem !important;
		position: relative !important;
	}
`;
