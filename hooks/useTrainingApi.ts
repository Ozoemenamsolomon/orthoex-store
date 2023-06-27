import { contentfulData } from '@data/contentfulData';
import { createClient } from 'contentful';

const spaceId = process.env.CONTENTFUL_TRAINING_SPACE || '';
const environment = process.env.CONTENTFUL_TRAINING_ENVIRONMENT || '';
const accessToken = process.env.CONTENTFUL_TRAINING_ACCESS_TOKEN || '';
const entryId = process.env.CONTENTFUL_TRAINING_ENTRY_ID || '';

const useTrainingEventApi = () => {
	// const client = createClient({
	// 	space: spaceId,
	// 	accessToken: environment,
	// 	host: 'cdn.contentful.com',
	// });

	const getTrainingEvents = () => {
		try {
			// const trainingEvents = await client.getEntries();
			// return trainingEvents.items;
			return contentfulData;
		} catch (error) {
			console.log(error);
		}
	};

	return { getTrainingEvents };
};

export default useTrainingEventApi;
