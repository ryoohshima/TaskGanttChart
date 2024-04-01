import { supabase, fetchData } from "@/lib/supabase";

/**
 * supabaseからデータを取得する関数
 * @function fetch
 * @param {Object} req - The request object
 * @param {string} req.tableName - The table name
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const fetch = async (req, res) => {
  // POST以外のリクエストは受け付けない
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // リクエストボディからデータを取得
  const tableName = req.body.tableName;

  // supabaseにデータを追加
  const data = await fetchData(supabase, tableName, '*');

  // データを返す
  return res.status(200).json(data);
}

export default fetch;
