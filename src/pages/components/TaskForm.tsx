// src/pages/components/TaskForm.tsx

import { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import {actionCreateTask} from '@/app/actions';

interface TaskFormProps {
  fetchTasks: () => void; // Define the type of fetchTasks prop
  taskToEdit:  null;
  setTaskToEdit: React.Dispatch<React.SetStateAction<null>>;
}

const TaskForm: React.FC<TaskFormProps> = ({ fetchTasks, taskToEdit, setTaskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(taskToEdit){
        await axios.patch(`http://localhost:30001/tasks/${taskToEdit._id}`, { title, description });
      } else {

        await actionCreateTask({ title, description, isCompleted: false })
        // await axios.post('http://localhost:30001/tasks', { title, description, isCompleted: false });
      }
      // await axios.post('http://localhost:30001/tasks', { title, description, isCompleted: false });
      setTitle('');
      setDescription('');
      setTaskToEdit(null);
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </Button>
    </Box>
  );
};

export default TaskForm;
