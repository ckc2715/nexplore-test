import axios from 'axios';
import { Todo } from '../types/todo';

const API_BASE_URL =
  process.env.REACT_APP_API_SERVER || 'http://localhost:8080';

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchTodoList = async () => {
  try {
    const response = await apiService.get('/todo');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleAddTodo = async (duty: string) => {
  try {
    const response = await apiService.post('/todo', { duty });
    return response.data as Todo;
  } catch (error) {
    throw error;
  }
};

export const markComplete = async (id: number) => {
  try {
    const response = await apiService.put<any, { data: { ok: boolean } }>(
      `/todo/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const markDelete = async (id: number) => {
  try {
    const response = await apiService.delete<any, { data: { ok: boolean } }>(
      `/todo/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
