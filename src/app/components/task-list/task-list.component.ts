import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  isNewTask: boolean = true;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  openNewTaskModal(): void {
    this.isNewTask = true;
    this.selectedTask = null;
    const taskModal = new Modal(document.getElementById('taskModal')!);
    taskModal.show();
  }

  openEditTaskModal(task: Task): void {
    this.isNewTask = false;
    this.selectedTask = { ...task };
    const taskModal = new Modal(document.getElementById('taskModal')!);
    taskModal.show();
  }

  confirmDelete(task: Task): void {
    this.selectedTask = task;
    const confirmModal = new Modal(
      document.getElementById('confirmDeleteModal')!
    );
    confirmModal.show();
  }

  deleteTask(): void {
    if (this.selectedTask) {
      this.taskService.deleteTask(this.selectedTask.id);
      window.location.reload();
      this.loadTasks();
      const confirmModal = Modal.getInstance(
        document.getElementById('confirmDeleteModal')!
      );
      if (confirmModal) {
        confirmModal.hide();
      }
    }
  }

  handleFormSubmit(task: Task): void {
    if (this.isNewTask) {
      this.taskService.addTask(task);
    } else {
      this.taskService.updateTask(task);
    }
    this.loadTasks();
    const taskModal = Modal.getInstance(document.getElementById('taskModal')!);
    if (taskModal) {
      taskModal.hide();
    }
  }
}
