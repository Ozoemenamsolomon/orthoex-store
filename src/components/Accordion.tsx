import React, { FC } from 'react';

const Accordion: FC = ({ children }) => {
	return (
		<div className="accordion" id="accordionExample">
			<div className="card">
				<div
					className="card-header d-flex justify-content-between"
					id="headingOne"
				>
					<h3 className="mb-0">
						<span>Content Writer</span>
					</h3>
					<button
						className="btn float-right btn-link"
						type="button"
						data-toggle="collapse"
						data-target="#collapseOne"
						aria-expanded="true"
						aria-controls="collapseOne"
					>
						See Details and Apply
					</button>
				</div>

				<div
					id="collapseOne"
					className="collapse show"
					aria-labelledby="headingOne"
					data-parent="#accordionExample"
				>
					<div className="card-body">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Accordion;
