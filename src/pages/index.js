import React, { use, useEffect, useState } from 'react';
import { supabase, fetchData } from '@/lib/supabase';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '@/components/organisms/table';
import GanttChart from '@/components/organisms/ganttChart';
import CustomTabs from '@/components/organisms/tab';
import CustomModal from '@/components/organisms/modal';
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

  const [rows, setRows] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    // テーブルの行の作成
    const rows = createRows(tasks);
    setRows(rows);

    // ガントチャートのデータ作成
    const chartOptions = createChartOptions(rows);
    setChartOptions(chartOptions);
  }, [tasks, members]);

  const createRows = (tasks) => {
    return tasks.map((task) => {
      return {
        id: task.id,
        title: task.title,
        startDate: task.startDate,
        endDate: task.endDate,
        assign: members.find((member) => member.id === task.assign && member.name).name,
      };
    });
  }

  // タブボタンの実装
  const [tabValue, setTabValue] = useState(0);
  const buttons = [{ id: 0, label: 'Table' }, { id: 1, label: 'Chart' }];
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // モーダルの実装
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleModalOpen = () => setModalOpen(true)
  const handleModalClose = () => setModalOpen(false);
  const modalItems = [
    {
      label: 'title',
      item: 'input',
    },
    {
      label: 'startDate',
      item: 'date',
    },
    {
      label: 'endDate',
      item: 'date',
    },
    {
      label: 'assign',
      item: 'select',
      options: members.map((member) => member.name),
    },
  ];

  // データ追加の実装
  const [insertData, setInsertData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    assign: '',
  });
  const handleChangeInput = ({ id, value }) => {
    if (id === 'assign') {
      const assign = members.find((member) => member.name === value);
      setInsertData({ ...insertData, assign: assign.id });
    } else {
      setInsertData({ ...insertData, [id]: value });
    }
  }
  const handleInsertData = async () => {
    setLoading(true);

    // supabaseにデータを追加
    const res = await fetch('/api/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tableName: 'tasks',
        data: insertData,
      }),
    });

    if (res.status == 200) {
      setModalOpen(false);

      // データの再取得
      const newTasks = await fetch('/api/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tableName: 'tasks',
        }),
      });

      if (newTasks.status == 200) {
        const data = await newTasks.json();
        const rows = createRows(data);
        setRows(rows);
        const chartOptions = createChartOptions(rows);
        setChartOptions(chartOptions);
      } else {
        alert('データの再取得に失敗しました。ページをリロードしてください。');
      }
    } else {
      alert('データの追加に失敗しました');
    }
    setLoading(false);
  }

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
      <CustomModal modalOpen={modalOpen} onModalClose={handleModalClose} modalItems={modalItems} onInsertData={handleInsertData} onChangeInput={handleChangeInput} loading={loading} />
    </>
  );
};

export default Dashboard;
