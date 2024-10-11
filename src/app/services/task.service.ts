import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private storageKey = 'todo_tasks';

  constructor() {}

  getTasks(): Task[] {
    const tasksJson = localStorage.getItem(this.storageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  addTask(newTask: Task): void {
    const tasks = this.getTasks();
    newTask.id = new Date().getTime();
    tasks.push(newTask);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
  }

  deleteTask(taskId: number): void {
    const tasks = this.getTasks();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedTasks));
  }
}
