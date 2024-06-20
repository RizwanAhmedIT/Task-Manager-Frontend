import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  TextField,
  Switch
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import axios from 'axios';
import { Task } from '@/types/interface';



interface TaskListProps {
  tasks: Task[];
  fetchTasks: () => void;
}

const TaskList = ({ tasks, fetchTasks }: TaskListProps) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  
  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setTaskToEdit(null);
    setOpenEditDialog(false);
  };

  const handleToggleCompleted = async (task: Task) => {
    const updatedTask = { ...task, isDone: !task.isDone };
    await axios.patch(`http://localhost:30001/tasks/${task._id}`, updatedTask);
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:30001/tasks/${id}`);
    fetchTasks();
  };

  const handleSubmitEditDialog = async () => {
    await axios.patch(`http://localhost:30001/tasks/${taskToEdit?._id}`, taskToEdit);
    fetchTasks();
    handleCloseEditDialog();
  };


  return (
    <>
    {/* <List>
      {tasks.map((task) => (
        <ListItem key={task._id} secondaryAction={
          <>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(task)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task._id)}>
                <DeleteIcon />
              </IconButton>
            </>
        }>
          <ListItemText primary={task.title} secondary={task.description} />
        </ListItem>
      ))}
    </List> */}
    <List>
        {tasks.map((task) => (
          <ListItem
            key={task._id}
            divider
          >
            <ListItemText primary={task.title} secondary={task.description} />
            <ListItemSecondaryAction>
              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={task.isDone}
                    onChange={() => handleToggleCompleted(task)}
                    color="primary"
                  />
                }
                label="Completed"
              /> */}
              <FormControlLabel
                control={
                  <Switch
                    checked={task.isDone}
                    onChange={() => handleToggleCompleted(task)}
                    color="primary"
                  />
                }
                label="Completed"
              />
              {/* // make */}
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(task)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={taskToEdit ? taskToEdit.title : ''}
            onChange={(e) => setTaskToEdit({ ...taskToEdit, title: e.target.value })}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            value={taskToEdit ? taskToEdit.description : ''}
            onChange={(e) => setTaskToEdit({ ...taskToEdit, description: e.target.value })}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={taskToEdit ? taskToEdit.isDone : true}
                onChange={(e) => setTaskToEdit({ ...taskToEdit, isDone: e.target.checked })}
                color="primary"
              />
            }
            label="Completed"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitEditDialog} variant="contained" color="primary">
            Update Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskList;
