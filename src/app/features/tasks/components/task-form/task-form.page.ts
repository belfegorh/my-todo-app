import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../../models/task.model';
import { Category } from '../../../../models/category.model';
import { TaskService } from '../../../../services/task.service';
import { CategoryService } from '../../../../services/category.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
  standalone: false,
})
export class TaskFormPage implements OnInit {
  task: Task = {
    id: '',
    title: '',
    description: '',
    completed: false,
    categoryId: undefined,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  categories: Category[] = [];
  isEditMode = false;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.isEditMode = true;
      await this.loadTask(taskId);
    }
    await this.loadCategories();
  }

  async loadTask(id: string) {
    const loadedTask = await this.taskService.getTask(id);
    if (loadedTask) {
      this.task = { ...loadedTask };
    }
  }

  async loadCategories() {
    this.categories = await this.categoryService.getCategories();
  }

  async saveTask() {
    if (!this.task.title.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El título es obligatorio',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    try {
      if (this.isEditMode) {
        await this.taskService.updateTask(this.task.id, {
          title: this.task.title,
          description: this.task.description,
          completed: this.task.completed,
          categoryId: this.task.categoryId
        });
      } else {
        await this.taskService.createTask({
          title: this.task.title,
          description: this.task.description,
          completed: false,
          categoryId: this.task.categoryId
        });
      }
      this.router.navigate(['/tasks']);
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo guardar la tarea',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
