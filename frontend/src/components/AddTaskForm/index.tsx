import { Form, Modal, Input } from 'antd';
import { Todo } from '../../types/todo';
import './style.scss';

interface AddTaskFormProps {
  open: boolean;
  onOk: (newTodo: Pick<Todo, 'duty'>) => void;
  confirmLoading: boolean;
  onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  open,
  onOk,
  onCancel,
  confirmLoading,
}) => {
  const [form] = Form.useForm();

  const handleAdd = () => {
    form
      .validateFields()
      .then((values) => {
        onOk(values);
      })
      .catch(() => {
        return;
      });
  };

  return (
    <Modal
      title="Add Task"
      open={open}
      onOk={handleAdd}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      okText="Add"
      destroyOnClose={true}
    >
      <Form form={form} layout="vertical" preserve={false}>
        <Form.Item
          label="Duty"
          name="duty"
          rules={[
            { required: true, message: 'Please input the duty' },
            { max: 50, message: 'The duty must be maximum 50 characters.' },
          ]}
        >
          <Input placeholder="Type your duty here..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTaskForm;
