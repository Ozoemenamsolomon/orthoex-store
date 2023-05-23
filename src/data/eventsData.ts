export enum EventFormat {
	ONLINE = 'ONLINE',
	ONSITE = 'ONSITE',
}
export interface EventDataType {
	id: number;
	title: string;
	eventFormat: EventFormat;
	startDateTime: string; // TODO make the date format using ISO 2007-04-05T12:30−02:00
	endDateTime: string;
	location: { city: string; state: string };
	price: number;
	contact: { call: string; chat: string };
	courseInfo: {
		course: string;
		instructor: string[];
	};
	refreshment: boolean;
	starterPack: boolean;
	participants: number;
	booked_spot: number;
}

export const featuredEvents: EventDataType[] = [
	{
		id: 1,
		title: 'Working with the glass fibre reinforced concrete',
		eventFormat: EventFormat.ONLINE,
		startDateTime: '',
		endDateTime: '',
		location: { city: 'Ikeja', state: 'Lagos' },
		price: 15000,
		contact: { call: '', chat: '' },
		courseInfo: {
			course:
				'In this workshop, the anatomical basics of modeling are taught on the basis of the eye, nose and ear. The right choice of modelling clay will be another component. Important tools and corresponding techniques are discussed.At the end of the seminar, a certificate of participation will be handed over',
			instructor: [
				'Attended the school of fine arts and design in berlin',
				'Founded his own miniature label "savage feget minis"',
				'In 2012 - has since worked for leading companies in the gaming industry',
			],
		},
		refreshment: true,
		starterPack: true,
		participants: 12,
		booked_spot: 3,
	},
	{
		id: 2,
		title: 'Working with the glass fibre reinforced concrete',
		eventFormat: EventFormat.ONSITE,
		startDateTime: '',
		endDateTime: '',
		location: { city: 'Badagry', state: 'Lagos' },
		price: 10000,
		contact: { call: '', chat: '' },
		courseInfo: {
			course:
				'In this workshop, the anatomical basics of modeling are taught on the basis of the eye, nose and ear. The right choice of modelling clay will be another component. Important tools and corresponding techniques are discussed.At the end of the seminar, a certificate of participation will be handed over',
			instructor: [
				'Attended the school of fine arts and design in berlin',
				'Founded his own miniature label "savage feget minis"',
				'In 2012 - has since worked for leading companies in the gaming industry',
			],
		},
		refreshment: true,
		starterPack: true,
		participants: 12,
		booked_spot: 3,
	},
	{
		id: 3,
		title: 'Working with the glass fibre reinforced concrete',
		eventFormat: EventFormat.ONLINE,
		startDateTime: '',
		endDateTime: '',
		location: { city: 'Ikeja', state: 'Lagos' },
		price: 250000,
		contact: { call: '', chat: '' },
		courseInfo: {
			course:
				'In this workshop, the anatomical basics of modeling are taught on the basis of the eye, nose and ear. The right choice of modelling clay will be another component. Important tools and corresponding techniques are discussed.At the end of the seminar, a certificate of participation will be handed over',
			instructor: [
				'Attended the school of fine arts and design in berlin',
				'Founded his own miniature label "savage feget minis"',
				'In 2012 - has since worked for leading companies in the gaming industry',
			],
		},
		refreshment: true,
		starterPack: true,
		participants: 12,
		booked_spot: 3,
	},
	{
		id: 4,
		title: 'Working with the glass fibre reinforced concrete',
		eventFormat: EventFormat.ONLINE,
		startDateTime: '',
		endDateTime: '',
		location: { city: 'Ikeja', state: 'Lagos' },
		price: 103500,
		contact: { call: '', chat: '' },
		courseInfo: {
			course:
				'In this workshop, the anatomical basics of modeling are taught on the basis of the eye, nose and ear. The right choice of modelling clay will be another component. Important tools and corresponding techniques are discussed.At the end of the seminar, a certificate of participation will be handed over',
			instructor: [
				'Attended the school of fine arts and design in berlin',
				'Founded his own miniature label "savage feget minis"',
				'In 2012 - has since worked for leading companies in the gaming industry',
			],
		},
		refreshment: true,
		starterPack: true,
		participants: 12,
		booked_spot: 3,
	},
];
