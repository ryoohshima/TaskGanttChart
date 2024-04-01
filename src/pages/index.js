import React, { useEffect, useState } from 'react';
import { supabase, fetchData } from '@/lib/supabase';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import CustomTable from '@/components/organisms/table';
import GanttChart from '@/components/organisms/ganttChart';
import CustomTabs from '@/components/organisms/tab';
import CustomModal from '@/components/organisms/modal';
import createChartOptions from '@/lib/chart';
import { getMemberId, getMemberName } from '@/lib/assign';

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
      const assign = getMemberName(task.assign, members);
      return {
        id: task.id,
        title: task.title,
        startDate: task.startDate,
        endDate: task.endDate,
        assign: assign,
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
  const handleModalOpen = () => {
    setModalOpen(true)
    setModalButton({ text: '追加', onClick: handleInsertData, variant: 'contained' });
  }
  const handleModalClose = () => {
    setInsertData({
      title: '',
      startDate: '',
      endDate: '',
      assign: '',
    });
    setModalOpen(false)
  };
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
    setInsertData({ ...insertData, [id]: value });
  };
  const handleInsertData = async (data) => {
    setLoading(true);
    const assign = getMemberId(data.assign, members);
    const newData = { ...data, assign: assign };

    // supabaseにデータを追加
    const res = await fetch('/api/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tableName: 'tasks',
        data: newData,
      }),
    });

    if (res.status == 200) {
      handleReloadData();
      setModalOpen(false);
    } else {
      alert('データの追加に失敗しました');
    }
    setLoading(false);
  }

  // データの再取得
  const handleReloadData = async () => {
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
      const filteredData = data.filter((task) => !task.isFinished);
      const rows = createRows(filteredData);
      setRows(rows);
      const chartOptions = createChartOptions(rows);
      setChartOptions(chartOptions);
    } else {
      alert('データの再取得に失敗しました。ページをリロードしてください。');
    }
  }

  // データの削除
  const handleDeleteData = async (id) => {
    setLoading(true);

    // supabaseからデータを削除
    const res = await fetch('/api/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tableName: 'tasks',
        data: { isDeleted: true },
        id: id,
      }),
    });

    if (res.status == 200) {
      handleReloadData();
    } else {
      alert('データの削除に失敗しました');
    }
    setLoading(false);
  }

  // データの更新
  const [modalButton, setModalButton] = useState({ text: '追加', onClick: handleInsertData, variant: 'contained' });
  const handleShowModal = async (row) => {
    setInsertData(row);
    setModalButton({ text: '更新', onClick: handleUpdateData, variant: 'outlined' });
    setModalOpen(true);
  }

  const handleUpdateData = async (data) => {
    setLoading(true);
    const newData = {
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      assign: getMemberId(data.assign, members)
    }

    // supabaseにデータを更新
    const res = await fetch('/api/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tableName: 'tasks',
        data: newData,
        id: data.id,
      }),
    });

    if (res.status == 200) {
      handleReloadData();
      handleModalClose();
    } else {
      alert('データの更新に失敗しました');
    }
    setLoading(false);
  }

  // タスクの完了
  const handleFinishTask = async (id) => {
    setLoading(true);

    // supabaseにデータを更新
    const res = await fetch('/api/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tableName: 'tasks',
        data: { isFinished: true },
        id: id,
      }),
    });

    if (res.status == 200) {
      handleReloadData();
    } else {
      alert('タスクの完了に失敗しました');
    }
    setLoading(false);
  }

  return (
    <>
      <h1>Dashboard</h1>
      <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
        <CustomTabs buttons={buttons} tabValue={tabValue} onTabChange={handleTabChange} />
        <IconButton aria-label="add" onClick={handleModalOpen}>
          <AddIcon />
        </IconButton>
      </Stack>
      <Box role="tabpanel" hidden={tabValue !== 0}>
        <CustomTable header={header} rows={rows} onDeleteData={handleDeleteData} onShowModal={handleShowModal} onFinishTask={handleFinishTask} />
      </Box>
      <Box role="tabpanel" hidden={tabValue !== 1} sx={{ position: 'relative', overflowX: 'scroll' }}>
        <Box sx={{ width: '1000px' }}>
          <GanttChart chartOptions={chartOptions} />
        </Box>
      </Box>
      <CustomModal modalOpen={modalOpen} onModalClose={handleModalClose} modalItems={modalItems} onChangeInput={handleChangeInput} loading={loading} data={insertData} modalButton={modalButton} />
    </>
  );
};

export default Dashboard;
