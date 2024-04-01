import React, { useEffect, useState } from 'react';
import { supabase, fetchData } from '@/lib/supabase';
import CustomTable from '@/components/organisms/table';
import EmptyData from '@/components/organisms/emptyData';
import { getMemberName } from '@/lib/assign';

export const getServerSideProps = async () => {
  // サーバーサイドでデータを取得
  const tasks = await fetchData(supabase, 'tasks', '*');
  const members = await fetchData(supabase, 'members', '*');

  // isFinishedがtrueのものに限定
  const filteredTasks = tasks.filter((task) => task.isFinished);
  console.log(filteredTasks);

  // データをpropsにセット
  return {
    props: {
      tasks: filteredTasks || [],
      members: members || [],
    },
  };
};

const Archive = ({ tasks, members }) => {
  if (tasks.length === 0) {
    return <EmptyData />;
  }
  // ヘッダーの作成
  const header = Object.keys(tasks[0]).filter(
    (key) => key !== 'isDeleted' && key !== 'isFinished' && key !== 'created_at' && key !== 'id',
  );

  const [rows, setRows] = useState([]);
  useEffect(() => {
    // テーブルの行の作成
    const rows = createRows(tasks);
    setRows(rows);
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
      const filteredData = data.filter((task) => task.isFinished);
      const rows = createRows(filteredData);
      setRows(rows);
    } else {
      alert('データの再取得に失敗しました。ページをリロードしてください。');
    }
  }

  // データのリストア
  const handleRestoreData = async (id) => {
    const res = await fetch('/api/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tableName: 'tasks',
        id: id,
        data: { isFinished: false },
      }),
    });

    if (res.status == 200) {
      handleReloadData();
    } else {
      alert('データのリストアに失敗しました');
    }
  }

  return (
    <>
      <h1>Archive</h1>
      <CustomTable header={header} rows={rows} onRestoreData={handleRestoreData} />
    </>
  );
};

export default Archive;
