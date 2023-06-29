export interface TrainingDataType {
	id: number;
	title: string;
	description: string;
	benefits: string[];
	trainingFormat: string;
	startDate: string;
	eventPosterImage: EventPosterImage;
	endDate: string;
	startTime: string;
	endTime: string;
	location: Location;
	price: number;
	phoneContact: string;
	whatsappContact: string;
	refreshment: boolean;
	starterPack: boolean;
	participants: number;
	nextTrainingDate: string;
	prerequisites?: string;
	extraInformation?: string;
}

export interface EventPosterImage {
	url: string;
	title: string;
}

export interface Location {
	lon: number;
	lat: number;
}
