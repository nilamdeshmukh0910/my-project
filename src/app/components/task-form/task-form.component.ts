import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() formSubmit = new EventEmitter<Task>();

  statusOptions = ['Not started', 'In Progress', 'Completed'];
  priorityOptions = ['Normal', 'Medium', 'High'];

  ngOnInit(): void {
    if (!this.task) {
      this.task = {
        id: 0,
        title: '',
        assignedTo: '',
        status: this.statusOptions[0],
        dueDate: null,
        priority: this.priorityOptions[0],
        description: '',
      };
    }
  }

  submitForm(taskForm: NgForm): void {
    if (taskForm.valid) {
      this.formSubmit.emit({ ...this.task, ...taskForm.value });
      taskForm.resetForm();
    }
  }
}
