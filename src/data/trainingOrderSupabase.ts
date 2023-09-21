import { supabaseTrainingClient } from '@utils/supabase';
import { TrainingOrderCreateType } from './types/trainingTypes/TypeOrthoexTrainingData';

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

