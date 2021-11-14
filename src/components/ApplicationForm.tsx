import { GetStaticProps, NextComponentType, NextPageContext } from 'next';
import Head from 'next/head';
import React, { FC, FormEvent, Fragment, useRef } from 'react';

type DataProp = {
	states: any;
};

const OldContactForm: FC<DataProp> = ({ states }) => {
	const fileElement = useRef(null);
	const handleSubmit = (e: FormEvent<HTMLInputElement>) => {
		fileElement.current.files[0].arrayBuffer().then((d) => console.log(d));
	};
	return (
		<Fragment>
			<form
				role="form"
				encType="multipart/form-data"
				// method="POST"
				// action="https://formspree.io/f/mbjqnrvd"
			>
				<input
					type="text"
					id="first_name"
					name="first_name"
					maxLength={255}
					autoComplete="given-name"
					placeholder="First Name"
					required
				/>
				<input
					type="text"
					id="last_name"
					name="last_name"
					maxLength={255}
					autoComplete="family-name"
					placeholder="Last Name"
					required
				/>
				<input
					type="email"
					id="email"
					name="email"
					aria-required
					maxLength={255}
					autoComplete="email"
					required
					placeholder="Email"
				/>
				<input
					type="text"
					id="phone"
					name="phone"
					maxLength={255}
					autoComplete="tel"
					placeholder="phone"
					required
				/>
				<input
					type="file"
					ref={fileElement}
					name="cv"
					id="cv"
					accept=".pdf"
					required
				/>
				<input
					type="text"
					name="linkedin"
					id="linkedin"
					placeholder="LinkedIn Profile"
				/>

				<select
					name="state"
					id="state"
					required
					className="frm-field required sect"
				>
					<option value="Select State">Select State of Residence</option>
					{states.map((state: any, id: React.Key | null | undefined) => (
						<option value={state} key={id}>
							{state}
						</option>
					))}
				</select>
				{/* old */}
				<textarea
					name="contact_message"
					required
					placeholder="What's one project you have worked on that you are extremely proud of?"
				></textarea>

				<div>
					<input
						type="checkbox"
						name="data-compliance"
						id="data-compliance"
						value="1"
						aria-required
						required
					/>
					<label htmlFor="data-compliance">
						Orthoex has my consent to collect, store, and process my data for
						the purpose of considering me for employment, and for up to 365 days
						thereafter.
						<span className="asterisk" aria-hidden="true">
							*
						</span>
					</label>
				</div>
				<input
					onClick={handleSubmit}
					type="submit"
					defaultValue="Send Application"
				/>
			</form>
		</Fragment>
	);
};

export default OldContactForm;

// export async function getStaticProps(context: NextPageContext) {
// 	const result = await fetch(
// 		'https://nigerian-states-info.herokuapp.com/api/v1/states'
// 	);
// 	const data = await result.json();
// 	return { props: { result } };
// }
