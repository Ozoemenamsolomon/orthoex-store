import React, { Fragment } from 'react';

const OrthoexHeader = () => {
	return (
		<Fragment>
			<div className="header wow zoomIn">
				<div className="container">
					<div
						className="header_left"
						data-wow-duration="2s"
						data-wow-delay="0.5s"
					>
						<ul>
							<li>
								<span
									className="glyphicon glyphicon-earphone"
									aria-hidden="true"
								></span>
								+234-703-032-4696
							</li>
							<li>
								<a href="mailto:info@orthoex.ng?subject=SOO-Contentwriter">
									<span
										className="glyphicon glyphicon-envelope"
										aria-hidden="true"
									></span>
									<span
										className="__cf_email__"
										data-cfemail="f79e999198b79885839f98928fd99990"
									>
										info@orthoex.ng
									</span>
								</a>
							</li>
						</ul>
					</div>
					<div className="header_right">
						<div className="login">
							<span style={{ color: '#FFFFFF' }} id="time"></span>
						</div>
						<div className="clearfix"></div>
					</div>
					<div className="clearfix"></div>
				</div>
			</div>
			<div className="header-bottom ">
				<div className="container">
					<nav className="navbar navbar-default">
						<div className="navbar-header" style={{ margin: 0, padding: 0 }}>
							<button
								type="button"
								className="navbar-toggle collapsed"
								data-toggle="collapse"
								data-target="#bs-example-navbar-collapse-1"
							>
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<div className="logo grid">
								<div
									className="grid__item color-3"
									style={{ margin: 0, padding: 0 }}
								>
									<a
										className="link link--nukun"
										href="http://www.orthoex.ng/index.php"
									>
										<span>
											{' '}
											<img
												className="link link--nukun img-responsive img-rounded"
												style={{ margin: 0, padding: 0, width: '300px' }}
												src="http://www.orthoex.ng/images/orthoex logo.png"
											/>{' '}
										</span>
									</a>
								</div>
							</div>
						</div>

						<div
							className="collapse navbar-collapse nav-wil"
							id="bs-example-navbar-collapse-1"
						>
							<nav className="menu menu--horatio">
								<ul
									className="nav navbar-nav menu__list"
									style={{ flexDirection: 'row' }}
								>
									<li className="menu__item ">
										<a
											href="http://www.orthoex.ng/index.php"
											className="menu__link"
										>
											Home
										</a>
									</li>
									<li className="menu__item ">
										<a
											href="http://www.orthoex.ng/about.php"
											className="menu__link"
										>
											About
										</a>
									</li>
									<li className="menu__item">
										<a href="https://orthoex.ng/store/" className="menu__link">
											Store
										</a>
									</li>
									<li className="menu__item">
										<a
											href="http://www.orthoex.ng/partners.php"
											className="menu__link"
										>
											Partners
										</a>
									</li>
									<li className="menu__item">
										<a
											href="http://www.orthoex.ng/Services.php"
											className="menu__link"
										>
											Services
										</a>
									</li>
									<li className="menu__item">
										<a
											href="http://www.orthoex.ng/contact.php"
											className="menu__link"
										>
											Contact
										</a>
									</li>
									<li className="menu__item menu__item--current">
										<a
											href="http://www.orthoex.ng/Careers.php"
											className="menu__link"
										>
											Careers
										</a>
									</li>
								</ul>
							</nav>
							<span style={{ color: '#FFA500' }} id="date">
								{' '}
							</span>
						</div>
					</nav>
				</div>
			</div>
		</Fragment>
	);
};

export default OrthoexHeader;
