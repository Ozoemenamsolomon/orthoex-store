import { createClient } from 'contentful';

const spaceId = process.env.CONTENTFUL_TRAINING_SPACE || '';
// const environment = process.env.CONTENTFUL_TRAINING_ENVIRONMENT || '';
const accessToken = process.env.CONTENTFUL_TRAINING_ACCESS_TOKEN || '';
// const entryId = process.env.CONTENTFUL_TRAINING_ENTRY_ID || '';

const useTrainingEventApi = () => {
	const client = createClient({
		space: spaceId,
		accessToken: accessToken,
		host: 'cdn.contentful.com',
	});

	const getTrainingEvents = async () => {
		try {
			const trainingEvents = await client.getEntries();

			const santizedData = trainingEvents.items.map((data: any) => {
				const posterImage = data.fields.eventPosterImage.fields;
				const eventPosterImage = {
					url: posterImage.file.url,
					title: posterImage.title,
				};
				return { ...data.fields, eventPosterImage };
			});

			return santizedData;
		} catch (error) {
			console.log(error);
		}
	};

	return { getTrainingEvents };
};

export default useTrainingEventApi;
