type posterImageType = {
	fields: {
		title: string;
		description: string;
		file: {
			url: string;
			fileName: string;
		};
	};
};

type LocationType = {
	latitude: string;
	longitude: string;
};
export interface OrthoexTrainingDataFieldsType {
	id: number;
	title: string;
	description: string;
	benefits: string[];
	prerequisites?: string;
	trainingFormat: 'ONLINE' | 'ONSITE';
	startDate: string;
	eventPosterImage?: posterImageType;
	endDate: string;
	startTime: string;
	endTime: string;
	location: LocationType;
	venue: string;
	price: number;
	phoneContact?: string;
	whatsappContact: string;
	refreshment: boolean;
	starterPack: boolean;
	participants: number;
	extraInformation?: string;
	nextTrainingDate?: string;
}

export interface TrainingSupbaseDataType {
	id: number;
	created_at: string;
	title: string;
	description: string;
	benefits: string[];
	prerequisites: string;
	trainingFormat: 'ONLINE' | 'ONSITE';
	startDateTime: '2023-07-29T18:38:11';
	endDateTime: '2023-08-06T18:33:23';
	eventPosterImage: string;
	location: string;
	price: number;
	phoneContact: string;
	whatsappContact: string;
	refreshment: boolean;
	starterPack: boolean;
	participants: 24;
	extraInformation?: string;
	nextTrainingDate?: string;
}

export const trainingSupbaseData = {
	id: 1,
	created_at: '2023-07-21T16:31:31.295812+00:00',
	title: 'Hello from supabase',
	description: 'this is just a test one please disregard!',
	benefits: [Array],
	prerequisites: 'oaieruestlrnvk roitvr ',
	trainingFormat: 'ONSITE',
	startDateTime: '2023-07-29T18:38:11',
	endDateTime: '2023-08-06T18:33:23',
	eventPosterImage: 'tdheskihvnreosöihlvnes',
	location: 'hesihvjnes diesrhnesv',
	price: 20000,
	phoneContact: '123456876543',
	whatsappContact: '243567898765432',
	refreshment: true,
	starterPack: false,
	participants: 24,
	extraInformation: null,
	nextTrainingDate: null,
};
