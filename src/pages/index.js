import React, { useState } from 'react';
import { supabase, fetchData } from '@/lib/supabase';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '@/components/organisms/table';
import GanttChart from '@/components/organisms/ganttChart';
import CustomTabs from '@/components/organisms/tab';
import createChartOptions from '@/lib/chart';

export const getServerSideProps = async () => {
  // サーバーサイドでデータを取得
  const tasks = await fetchData(supabase, 'tasks', '*');
  const members = await fetchData(supabase, 'members', '*');

  // isFinishedがtrueのものは除外
  const filteredTasks = tasks.filter((task) => !task.isFinished);

  // データをpropsにセット
  return {
    props: {
      tasks: filteredTasks || [],
      members: members || [],
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

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true)
  return (
    <>
      <h1>Dashboard</h1>
      <CustomTabs buttons={buttons} tabValue={tabValue} onTabChange={handleTabChange} />
      <Box role="tabpanel" hidden={tabValue !== 0}>
        <CustomTable header={header} rows={rows} />
        <IconButton aria-label="add" onClick={handleModalOpen}>
          <AddIcon />
        </IconButton>
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
