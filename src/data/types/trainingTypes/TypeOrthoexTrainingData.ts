export interface TrainingSupbaseDataType {
	id: number;
	created_at: string;
	title: string;
	description: string;
	benefits: string[];
	prerequisites: string;
	trainingFormat: 'ONLINE' | 'ONSITE';
	startDateTime: string;
	endDateTime: string;
	eventPosterImage: string;
	location: string;
	price: number;
	phoneContact: string;
	whatsappContact: string;
	refreshment: boolean;
	starterPack: boolean;
	participants: number;
	extraInformation?: string | null;
	nextTrainingDate?: string | null;
	trainingexperience?: string | null;
	trainingbenefactors?: string[] | null;
	trainingitems?: string | null;
}