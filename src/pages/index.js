import React, { useState } from 'react';
import supabase from '@/lib/supabase';
import { Box } from '@mui/material';
import CustomTable from '@/components/organisms/table';
import GanttChart from '@/components/organisms/ganttChart';
import CustomTabs from '@/components/organisms/tab';
import createChartOptions from '@/lib/chart';

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

  // ガントチャートのデータ作成
  const chartOptions = createChartOptions(rows);

  // タブボタンの実装
  const [tabValue, setTabValue] = useState(0);
  const buttons = [{ id: 0, label: 'Table' }, { id: 1, label: 'Chart' }];
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <h1>Dashboard</h1>
      <CustomTabs buttons={buttons} tabValue={tabValue} onTabChange={handleTabChange} />
      <Box role="tabpanel" hidden={tabValue !== 0}>
        <CustomTable header={header} rows={rows} />
      </Box>
      <Box role="tabpanel" hidden={tabValue !== 1} sx={{ position: 'relative', overflowX: 'scroll' }}>
        <Box sx={{ width: '1000px' }}>
          <GanttChart chartOptions={chartOptions} />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
