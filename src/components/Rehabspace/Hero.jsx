import BtnBasic from './Buttons';
import { rehabspaceHero } from '../../data/rehabspace';
import Image from 'next/image';

const Hero = () => {
	return (
		<div className="lg:mx-auto mb-40 lg:max-w-[1500px]  lg:px-[4rem] lg:mt-4 ">
			<div className="section-padding my-4 relative w-full pb-10 h-[80vh] md:h-[70vh] ">
				<div className="space-y- h-full pt-60   px-4 sm:px-12  lg:px-[6em] max-w-4xl">
					<h1 className="text-[var(--oex-orange)] font-semibold">
						{rehabspaceHero?.heading}
					</h1>
					<h6 className="text-white text-lg pb-4">
						{rehabspaceHero?.description}
					</h6>
					<BtnBasic href={'#/'} text={rehabspaceHero?.btnText} />
				</div>

				<div className="absolute overflow-hidden inset-0 lg:rounded-3xl -z-10 ">
					<div className="absolute inset-0 bg-gradient-to-t from-black  "></div>
					<Image
						width={600}
						height={400}
						src="/rehabspace/o.jpeg"
						alt="hero-img"
						className="w-full h-full object-cover"
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
