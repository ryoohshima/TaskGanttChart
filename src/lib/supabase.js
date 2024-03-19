import { createClient } from '@supabase/supabase-js';

// supabase client
const supabaesUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaesUrl, supabaseKey);

export default supabase;
