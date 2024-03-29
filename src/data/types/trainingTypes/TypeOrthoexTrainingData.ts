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
	bookedspot: number;
}

export interface TrainingPromoDataType {
	created_at: string;
	promo_amount: number | null;
	promo_code: string;
	promo_description: string;
	promo_percentage: number | null;
	valid_until: string;
}

export interface TrainingOrderType extends TrainingOrderCreateType {
	id: number;
	paid: boolean;
	reference: string;
}
export interface TrainingOrderCreateType {
	createdAt: string;
	expiredAt: string;
	trainingId: number;
	title: string;
	trainingDate: string;
	location: string;
	user: string;
	referalSource: string;
	trainingPrice: number;
	discount: number;
	appliedPromoCode: string;
	amountPaid: number;
	participants: string;
	numOfParticipants: number;
}

export interface TrainingAttendanceType {
	title: string;
	amountPaid: number;
	trainingId: number;
	trainingOrderId: number;
	trainingLocation: string;
	trainingOrderedBy: string;
	trainingDate: string;
	firstName: string;
	lastName: string;
	phone: string;
	completedTraining: boolean;
	participantId: string;
}
