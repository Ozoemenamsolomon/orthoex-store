import type { Asset, Entry, EntryFields } from 'contentful';

export interface TypeOrthoexTrainingDataFields {
	id: EntryFields.Integer;
	title: EntryFields.Symbol;
	description: EntryFields.Text;
	benefits: EntryFields.Symbol[];
	prerequisites?: EntryFields.Symbol;
	trainingFormat: 'ONLINE' | 'ONSITE';
	startDate: EntryFields.Date;
	eventPosterImage?: Asset;
	endDate: EntryFields.Date;
	startTime: EntryFields.Symbol;
	endTime: EntryFields.Symbol;
	location: EntryFields.Location;
	price: EntryFields.Integer;
	phoneContact?: EntryFields.Symbol;
	whatsappContact: EntryFields.Symbol;
	refreshment: EntryFields.Boolean;
	starterPack: EntryFields.Boolean;
	participants: EntryFields.Integer;
	extraInformation?: EntryFields.Text;
	nextTrainingDate?: EntryFields.Date;
}

type TypeOrthoexFieldsAndContentType = {
	fields: { [key: string]: any };
	contentTypeId: string;
};

export type TypeOrthoexTrainingData = Entry<
	TypeOrthoexTrainingDataFields & TypeOrthoexFieldsAndContentType
>;

export type OrthoexTrainingDataSkeleton = {
	contentTypeId: 'orthoexTrainingData';
	fields: TypeOrthoexTrainingDataFields;
};
