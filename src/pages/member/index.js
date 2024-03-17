import React from 'react';
import supabase from '@/lib/supabase';
import CustomTable from '@/components/organisms/table';

export const getServerSideProps = async () => {
  // サーバーサイドでデータを取得
  const { data: members, error: membersError } = await supabase.from('members').select('*');

  // エラーがあればエラーページにリダイレクト
  if (membersError) {
    throw new Error('Internal Server Error');
  }

  // isDeletedがtrueのものは除外
  const filteredMembers = members.filter((member) => !member.isDeleted);

  // データをpropsにセット
  return {
    props: {
      members: filteredMembers || [],
    },
  };
};

const Member = ({ members }) => {
  // ヘッダーの作成
  const header = Object.keys(members[0]).filter(
    (key) => key !== 'isDeleted' && key !== 'created_at' && key !== 'id',
  );

  // テーブルの行の作成
  const rows = members.map((member) => {
    return {
      id: member.id,
      name: member.name,
    };
  });

  return (
    <>
      <h1>Member</h1>
      <CustomTable header={header} rows={rows} />
    </>
  );
};

export default Member;
