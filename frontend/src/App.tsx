import { useEffect, useState } from 'react';
import './App.scss';
import AddTaskForm from './components/AddTaskForm';
import TaskCard from './components/TaskCard';
import { Button, Empty, Modal, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Todo } from './types/todo';
import {
  fetchTodoList,
  handleAddTodo,
  markComplete,
  markDelete,
} from './lib/apiService';

const App = () => {
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleAdd = async (newTodo: Pick<Todo, 'duty'>) => {
    setConfirmLoading(true);
    try {
      const result = await handleAddTodo(newTodo.duty);
      if (result) {
        fetchData();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setConfirmLoading(false);
      setShowAddEditModal(false);
    }
  };

  const handleMarkComplete = async (id: number) => {
    try {
      const result = await markComplete(id);
      if (result.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleMarkDelete = async (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this task?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        markDelete(id).then((result) => {
          if (result.ok) {
            fetchData();
          }
        });
      },
    });
  };

  async function fetchData() {
    setLoading(true);
    try {
      const result = await fetchTodoList();
      setTodoList(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData().then(() => setLoaded(true));
  }, []);

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Todo List</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setShowAddEditModal(true);
            }}
          >
            Add Task
          </Button>
        </div>
        <div className="task-container">
          {loading && <Spin size="large" />}
          {loaded && todoList.length === 0 && <Empty />}
          {todoList.map((todo) => (
            <TaskCard
              key={todo.id}
              todo={todo}
              markComplete={handleMarkComplete}
              markDelete={handleMarkDelete}
            />
          ))}
        </div>
      </div>

      <AddTaskForm
        onCancel={() => setShowAddEditModal(false)}
        confirmLoading={confirmLoading}
        onOk={handleAdd}
        open={showAddEditModal}
      />
    </div>
  );
};

export default App;
