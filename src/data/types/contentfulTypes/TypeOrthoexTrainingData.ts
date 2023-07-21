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
