"use client";

import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import TaskForm from '../pages/components/TaskForm';
import TaskList from '../pages/components/TaskList';
import axios from 'axios';

interface Task {
  _id: string;
  title: string;
  description: string;
  // Add more fields if your task object has them
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]); // Specify Task[] as the type for tasks
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>('http://localhost:30001/tasks'); // Specify Task[] as the expected response data type
      console.log(response);
      setTasks(response.data);
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
