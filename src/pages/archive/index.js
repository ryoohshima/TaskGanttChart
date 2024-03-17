import React from 'react';
import supabase from '@/lib/supabase';
import CustomTable from '@/components/organisms/table';
import Navigation from '@/components/organisms/navigation';

export const getServerSideProps = async () => {
  // サーバーサイドでデータを取得
  const { data: tasks, error: tasksError } = await supabase.from('tasks').select('*');
  const { data: members, error: membersError } = await supabase.from('members').select('*');

  // エラーがあればエラーページにリダイレクト
  if (tasksError || membersError) {
    throw new Error('Internal Server Error');
  }

  // isDeletedがtrueのものは除外
  const filteredTasks = tasks.filter((task) => !task.isDeleted && task.isFinished);
  const filteredMembers = members.filter((member) => !member.isDeleted);

  // データをpropsにセット
  return {
    props: {
      tasks: filteredTasks || [],
      members: filteredMembers || [],
    },
  };
};

const Archive = ({ tasks, members }) => {
  // ヘッダーの作成
  const header = Object.keys(tasks[0]).filter(
    (key) => key !== 'isDeleted' && key !== 'isFinished' && key !== 'created_at' && key !== 'id',
  );

  // テーブルの行の作成
  const rows = tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      startDate: task.startDate,
      endDate: task.endDate,
      assign: members.find((member) => member.id === task.assign && member.name).name,
    };
  });

  return (
    <>
      <h1>Archive</h1>
      <Navigation />
      <CustomTable header={header} rows={rows} />
    </>
  );
};

export default Archive;
