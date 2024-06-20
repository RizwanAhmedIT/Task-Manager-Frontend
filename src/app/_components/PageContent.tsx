"use client";

import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import TaskForm from '../../pages/components/TaskForm';
import TaskList from '../../pages/components/TaskList';
import axios from 'axios';
import { Task } from '@/types/interface';
import {actionGetTask} from '../actions';


export default function HomeContent({initialData}: {initialData: Task[]}) {
  const [tasks, setTasks] = useState<Task[]>(initialData); // Specify Task[] as the type for tasks
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    try {
      const data = await actionGetTask(); // Specify Task[] as the expected response data type
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Task Manager
      </Typography>
      <TaskForm fetchTasks={fetchTasks} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} setTaskToEdit={setTaskToEdit} />
    </Container>
  );
}
