import { supabaseTrainingClient } from '@utils/supabase';
import {
	TrainingOrderCreateType,
	TrainingOrderType,
	TrainingSupbaseDataType,
} from './types/trainingTypes/TypeOrthoexTrainingData';

interface TrainingType extends TrainingOrderCreateType {
	reference: string;
}

export const createTrainingOrder = async (trainingOrder: TrainingType) => {
	const { data, error } = await supabaseTrainingClient
		.from('training_orders')
		.insert(trainingOrder);

	if (error) {
		throw error;
	}
	return data;
};

export const getUnpaidTrainingOrder = async (reference: string) => {
	const { data, error } = await supabaseTrainingClient
		.from('training_orders')
		.select('*')
		.eq('reference', reference)
		.eq('paid', false)
		// TODO: add this later
		//.gte('expiredAt', new Date())
		.single();

	if (error) {
		console.log(error);
		return null;
	}

	return data;
};
export const updateTrainingOrderToPaid = async (
	reference: string,
	user: string,
) => {
	const { data, error } = await supabaseTrainingClient
		.from('training_orders')
		.update({ paid: true })
		.eq('reference', reference)
		.eq('user', user)
		.select('*')
		.single();

	if (error) {
		console.log(error);
		return null;
	}

	return data as unknown as TrainingOrderType;
};
export const deleteTrainingOrderWithId = async (
	reference: string,
	user: string,
) => {
	const { data, error } = await supabaseTrainingClient
		.from('training_orders')
		.delete()
		.eq('reference', reference)
		.eq('user', user);

	if (error) {
		console.log(error);
		return null;
	}

	return data;
};

export type UpdateTrainingDataType =
	Partial<TrainingSupbaseDataType>;

export const updateTrainingWithId = async (
	id: number,
	updateData: UpdateTrainingDataType,
) => {
	const { data, error } = await supabaseTrainingClient
		.from('training')
		.update(updateData)
		.eq('id', id)
		.select('*')
		.single();

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	return data as unknown as TrainingSupbaseDataType;
};


export const getTrainingWithId = async (id: number) => {
	const { data, error } = await supabaseTrainingClient
		.from('training')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	return data as unknown as TrainingSupbaseDataType;
};