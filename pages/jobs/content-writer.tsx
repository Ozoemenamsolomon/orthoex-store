import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React, { Fragment } from 'react';
import Accordion from '../../src/components/Accordion';
import ApplicationStatment from '../../src/components/ApplicationStatment';
import JobDetails from '../../src/components/JobDetails';
import ApplicationForm from '../../src/components/ApplicationForm';
import OrthoexHead from '../../src/components/OrthoexHead';
import OrthoexHeader from '../../src/components/OrthoexHeader';

type StateDataProp = {
	data: { data: { Name: String }[] };
};

const ContentWriter: NextPage<StateDataProp> = ({ data }) => {
	const states = data.data.map((state) => state.Name);

	return (
		<Fragment>
			<OrthoexHead />
			<OrthoexHeader />

			<div className="banner page_head"></div>

			<div className="about-page">
				<div className="container">
					<h3 className="tittle">Open Positions</h3>
					{/* Job Details */}
					<Accordion>
						<JobDetails></JobDetails>
						<div className="contact-grids">
							<div className="col-md-6 contact-grid ">
								<ApplicationForm states={states}></ApplicationForm>
							</div>
							<div className="col-md-6 contact-left-map ">
								<ApplicationStatment></ApplicationStatment>
							</div>
							<div className="clearfix"> </div>
						</div>
					</Accordion>
					<div className="clearfix"></div>
				</div>
			</div>

			<script src="http://www.orthoex.ng/js/greetingtime.js"> </script>
		</Fragment>
	);
};

export default ContentWriter;

export const getStaticProps: GetStaticProps = async (context) => {
	const result = await fetch(
		'https://nigerian-states-info.herokuapp.com/api/v1/states'
	);
	const data = await result.json();
	return { props: { data } };
};
