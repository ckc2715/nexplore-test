export interface Todo {
  id: number;
  duty: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
