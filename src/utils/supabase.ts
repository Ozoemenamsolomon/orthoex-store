import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';
const supabaseTrainingUrl = process.env.NEXT_PUBLIC_SUPABASE_TRAINING_URL || '';
const supabaseTrainingKey = process.env.NEXT_PUBLIC_SUPABASE_TRAINING_KEY || '';

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
export const supabaseTrainingClient = createClient(
	supabaseTrainingUrl,
	supabaseTrainingKey,
);
