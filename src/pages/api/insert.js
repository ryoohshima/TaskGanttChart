import { supabase } from "@/lib/supabase";

/**
 * supabaseにデータを追加する関数
 * @function insert
 * @param {Object} req - The request object
 * @param {string} req.tableName - The table name
 * @param {Object} req.data - The data to insert
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const insert = async (req, res) => {
  // POST以外のリクエストは受け付けない
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // リクエストボディからデータを取得
  const tableName = req.body.tableName;
  const insertData = req.body.data;

  // supabaseにデータを追加
  const { data, error } = await supabase.from(tableName).insert(insertData).select();

  // エラーがあればエラーメッセージを返す
  if (error) {
    return res.status(500).json({ message: error.message });
  }

  // データを返す
  return res.status(200).json(data);
}

export default insert;