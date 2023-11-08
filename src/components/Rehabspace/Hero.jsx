import BtnBasic from './Buttons';
import { rehabspaceHero } from '../../data/rehabspace';

const Hero = () => {
	return (
		<div className="lg:mx-auto mb-40 lg:max-w-[1500px]  lg:px-[4rem] lg:mt-4 ">
			<div className="section-padding my-4 relative w-full pb-10 lg:h-[65vh] ">
				<div className="space-y- h-full  pt-40 px-4 sm:px-12  lg:px-[6em] max-w-4xl">
					<h1 className="text-[var(--oex-orange)] pb-">
						{rehabspaceHero?.heading}
					</h1>
					<p className="text-white text-lg pb-4">
						{rehabspaceHero?.description}
					</p>
					<BtnBasic href={'#/'} text={rehabspaceHero?.btnText} />
				</div>

				<div className="absolute overflow-hidden inset-0 bg-gradient-to-t from-black lg:rounded-3xl -z-10 ">
					<img src="" alt="hero-img" className="w-full h-full object-cover" />
				</div>
			</div>
		</div>
	);
};

export default Hero;
