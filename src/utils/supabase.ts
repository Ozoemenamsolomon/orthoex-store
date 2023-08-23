import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabaseTrainingUrl = process.env.SUPABASE_TRAINING_URL || '';
const supabaseTrainingKey = process.env.SUPABASE_TRAINING_KEY || '';

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
export const supabaseTrainingClient = createClient(
	supabaseTrainingUrl,
	supabaseTrainingKey,
);
