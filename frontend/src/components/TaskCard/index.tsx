import classNames from 'classnames';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { Todo } from '../../types/todo';
import './style.scss';

interface TaskCardProps {
  todo: Todo;
  markComplete: (id: number) => void;
  markDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  todo,
  markComplete,
  markDelete,
}) => {
  const { id, duty, completed } = todo;

  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{duty}</span>
      </div>
      <div className="task-status-wrapper">
        <button
          className={classNames(completed && 'completed', 'status')}
          onClick={() => {
            if (completed) {
              return;
            }
            markComplete(id);
          }}
        >
          {completed ? 'Completed' : 'Todo'}
        </button>
      </div>
      <div className="actions">
        <DeleteIcon className="cp" onClick={() => markDelete(id)} />
      </div>
    </div>
  );
};

export default TaskCard;
