export interface Task {
  id: number;
  title: string;
  assignedTo: string;
  status: string;
  dueDate: Date | null;
  priority: string;
  description: string;
}
