'use server';

import axios from 'axios';
import { Task } from '@/types/interface';
import {revalidateTag} from 'next/cache'

export async function actionGetTask(): Promise<Task[]>{

  const res = await fetch('http://localhost:30001/tasks', {
    cache: 'force-cache',
    next: {
      tags: ['tasks'],
    }
  })

  const data = res.json();

  return data;
  
  // try{
  //   const response = await axios.get<Task[]>('http://localhost:30001/tasks');
  //   return response.data;
  // }catch(e){
  //   return [];
  //   // do some error handling
  // }
    
  
}

export async function actionCreateTask(data: any) {
  const res = await fetch('http://localhost:30001/tasks', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  revalidateTag('tasks');

  const resData = res.json();

  return resData;
}