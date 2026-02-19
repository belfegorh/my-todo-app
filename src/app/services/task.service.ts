import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { StorageService } from './storage.service';

const TASKS_KEY = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private storageService: StorageService) {}

  async getTasks(): Promise<Task[]> {
    const tasks = await this.storageService.get(TASKS_KEY);
    return tasks || [];
  }

  async getTask(id: string): Promise<Task | undefined> {
    const tasks = await this.getTasks();
    return tasks.find(t => t.id === id);
  }

  async getTasksByCategory(categoryId: string): Promise<Task[]> {
    const tasks = await this.getTasks();
    return tasks.filter(t => t.categoryId === categoryId);
  }

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const tasks = await this.getTasks();
    const newTask: Task = {
      ...task,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    tasks.push(newTask);
    await this.storageService.set(TASKS_KEY, tasks);
    return newTask;
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const tasks = await this.getTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    tasks[index] = { 
      ...tasks[index], 
      ...updates,
      updatedAt: new Date()
    };
    await this.storageService.set(TASKS_KEY, tasks);
    return tasks[index];
  }

  async deleteTask(id: string): Promise<void> {
    const tasks = await this.getTasks();
    const filtered = tasks.filter(t => t.id !== id);
    await this.storageService.set(TASKS_KEY, filtered);
  }

  async toggleTask(id: string): Promise<Task> {
    const task = await this.getTask(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return await this.updateTask(id, { completed: !task.completed });
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
