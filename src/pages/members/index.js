import React, { useEffect, useState } from 'react';
import { supabase, fetchData } from '@/lib/supabase';
import CustomTable from '@/components/organisms/table';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CustomModal from '@/components/organisms/modal';

export const getServerSideProps = async () => {
  // サーバーサイドでデータを取得
  const members = await fetchData(supabase, 'members', '*');

  // データをpropsにセット
  return {
    props: {
      members: members || [],
    },
  };
};

const Members = ({ members }) => {
  // ヘッダーの作成
  const header = Object.keys(members[0]).filter(
    (key) => key !== 'isDeleted' && key !== 'created_at' && key !== 'id',
  );

  // テーブルの行の作成
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const rows = createRows(members);
    setRows(rows);
  }, [members]);

  const createRows = (members) => {
    return members.map((member) => {
      return {
        id: member.id,
        name: member.name,
      };
    });
  }

  // モーダルの実装
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true)
    setModalButton({ text: '追加', onClick: handleInsertData, variant: 'contained' });
  }

  const handleModalClose = () => {
    setInsertData({
      name: '',
    });
    setModalOpen(false)
  };
  const modalItems = [
    {
      label: 'name',
      item: 'input',
    },
  ];

  // データ追加の実装
  const [insertData, setInsertData] = useState({
    name: '',
  });
  const handleChangeInput = ({ id, value }) => {
    setInsertData({ ...insertData, [id]: value });
  };
  const handleInsertData = async (data) => {
    setLoading(true);

    // supabaseにデータを追加
    const res = await fetch('/api/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tableName: 'members',
        data: data,
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
        tableName: 'members',
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

  // データの再取得
  const handleReloadData = async () => {
    const newTasks = await fetch('/api/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tableName: 'members',
      }),
    });

    if (newTasks.status == 200) {
      const data = await newTasks.json();
      const rows = createRows(data);
      setRows(rows);
    } else {
      alert('データの再取得に失敗しました。ページをリロードしてください。');
    }
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
      name: data.name,
    }

    // supabaseにデータを更新
    const res = await fetch('/api/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tableName: 'members',
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

  return (
    <>
      <h1>Members</h1>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton aria-label="add" onClick={handleModalOpen}>
          <AddIcon />
        </IconButton>
      </Box>
      <CustomTable header={header} rows={rows} onDeleteData={handleDeleteData} onShowModal={handleShowModal} />
      <CustomModal modalOpen={modalOpen} onModalClose={handleModalClose} modalItems={modalItems} onChangeInput={handleChangeInput} loading={loading} data={insertData} modalButton={modalButton} />
    </>
  );
};

export default Members;
