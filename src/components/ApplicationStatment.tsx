import React from 'react';

const ApplicationStatment = () => {
	return (
		<>
			<p style={{ color: '#000000' }}>
				We are always ready to hear from you and respond to your request. Feel
				free to ask us anything about products, manufacturers or any other query
				on Medical devices.{' '}
			</p>
			<ul className="contact-list">
				<li>
					<span
						className="glyphicon glyphicon-map-marker"
						aria-hidden="true"
					></span>
					10, Ikpakodo - Wharf Road, Ebute, Ikorodu Lagos State, Nigeria. <br />
				</li>
				<li>
					<span
						className="glyphicon glyphicon-envelope"
						aria-hidden="true"
					></span>
					<a href="mailto:info@orthoex.ng?subject=Soo-ContentWriter">
						info@orthoex.ng
					</a>
				</li>
				<li>
					<span className="glyphicon glyphicon-phone" aria-hidden="true"></span>
					+234-703-032-4696{' '}
				</li>
				<li>
					<span
						className="glyphicon glyphicon-earphone"
						aria-hidden="true"
					></span>
					+234-811-223-0122
				</li>
				<br />
				<li>
					<span className="glyphicon glyphicon-time" aria-hidden="true"></span>{' '}
					Monday - Friday: 8:00 AM to 4:00 PM
				</li>
			</ul>
		</>
	);
};

export default ApplicationStatment;
