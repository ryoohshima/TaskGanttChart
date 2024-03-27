import { supabase } from "@/lib/supabase";

/**
 * supabaseのデータを編集する関数
 * @function update
 * @param {Object} req - The request object
 * @param {string} req.tableName - The table name
 * @param {Object} req.data - The record id
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const update = async (req, res) => {
  // POST以外のリクエストは受け付けない
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // リクエストボディからデータを取得
  const tableName = req.body.tableName;
  const updateData = req.body.data;
  const updateId = req.body.id;

  console.log('tableName:', tableName);
  console.log('updateData:', updateData);
  console.log('updateId:', updateId);

  // supabaseにデータを追加
  const { data, error } = await supabase.from(tableName).update(updateData).eq('id', updateId).select();

  // エラーがあればエラーメッセージを返す
  if (error) {
    return res.status(500).json({ message: error.message });
  }

  // データを返す
  return res.status(200).json(data);
}

export default update;