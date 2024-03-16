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
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }

  // データをpropsにセット
  return {
    props: {
      tasks: tasks || [],
      members: members || [],
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
