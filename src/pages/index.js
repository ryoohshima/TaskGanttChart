import React from 'react';
import supabase from '@/lib/supabase';
import EnhancedTable from '@/components/organisms/table';
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
  const filteredTasks = tasks.filter((task) => !task.isDeleted && !task.isFinished);
  const filteredMembers = members.filter((member) => !member.isDeleted);

  // データをpropsにセット
  return {
    props: {
      tasks: filteredTasks || [],
      members: filteredMembers || [],
    },
  };
};

const Dashboard = ({ tasks, members }) => {
  return (
    <>
      <h1>Dashboard</h1>
      <Navigation />
      <EnhancedTable />
    </>
  );
};

export default Dashboard;
