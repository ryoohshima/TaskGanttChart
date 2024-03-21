import { createClient } from '@supabase/supabase-js';

// supabase client
const supabaesUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaesUrl, supabaseKey);

/**
 * supabaseからデータを取得する関数
 * @function fetchData
 * @param {Object} supabase - The supabase object
 * @param {string} tableName - The table name
 * @param {string} select - The select option
 * @returns {Object} - The data object
 */
export const fetchData = async (supabase, tableName, select) => {
  const { data, error } = await supabase.from(tableName).select(select);
  if (error) {
    throw new Error(error.message);
  }
  const filteredData = data.filter((item) => !item.isDeleted);
  return filteredData;
}
