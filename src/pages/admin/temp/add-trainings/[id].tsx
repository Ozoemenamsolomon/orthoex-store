import React from 'react';
import { useRouter } from 'next/router';

const TrainingDetailPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<div>
			<h4>Details</h4>
			<p>Training with id {id}</p>
		</div>
	);
};

export default TrainingDetailPage;
