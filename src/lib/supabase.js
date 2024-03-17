import { createClient } from '@supabase/supabase-js';

// supabase client
const sppabaesUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(sppabaesUrl, supabaseKey);

export default supabase;
