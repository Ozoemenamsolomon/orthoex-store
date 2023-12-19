import { bookingDetails } from '../../data/rehabspace';

const BookingTypes = () => {
	return (
		<section className="mx-auto mb- max-w-[1500px] max-md:px-[1rem] px-[4rem]  ">
			<div className="grid gap-10 lg:grid-cols-2">
				{/* video */}
				<div className="w-full h-86  lg:h-full rounded-3xl overflow-hidden ">
					<div className="-translate-x-20 lg:-translate-y-0 scale-[60%]  sm:scale-90 md:translate-x-0 lg:-translate-x-28 ">
						{bookingDetails?.svg}
					</div>
				</div>

				<div>
					<div className="p-6 sm:p-10 lg:p-14 rounded-3xl bg-[var(--oex-light-grey)]">
						<h3 className="pb-8 font-semibold">{bookingDetails?.title}</h3>
						<div className="space-y-4 ">
							{bookingDetails?.types?.map((item, idx) => (
								<div
									key={idx}
									className="flex justify-between items-center gap-2 ">
									<div className="flex gap-2 items-center">
										<div className="text-[var(--oex-orange)]">
											{bookingDetails?.typesIcon}
										</div>
										<h5 className="text-[var(--text-colour-grey)]">
											{item.type}
										</h5>
									</div>
									<div className="h-2 w-2 rounded-full bg-black"></div>
									<h5 className="">{item?.value}</h5>
								</div>
							))}
						</div>
						<h5 className="pt-8">{bookingDetails?.footerText}</h5>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BookingTypes;
