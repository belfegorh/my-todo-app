import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';
import { TaskService } from '../../../../services/task.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false,
})
export class CategoriesPage implements OnInit {
  categories: Category[] = [];
  categoryTaskCounts: { [key: string]: number } = {};

  constructor(
    private categoryService: CategoryService,
    private taskService: TaskService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.loadData();
  }

  async ionViewWillEnter() {
    await this.loadData();
  }

  async loadData() {
    this.categories = await this.categoryService.getCategories();
    await this.loadTaskCounts();
  }

  async loadTaskCounts() {
    const tasks = await this.taskService.getTasks();
    this.categoryTaskCounts = {};
    
    this.categories.forEach(category => {
      this.categoryTaskCounts[category.id] = tasks.filter(
        task => task.categoryId === category.id
      ).length;
    });
  }

  async deleteCategory(category: Category) {
    const taskCount = this.categoryTaskCounts[category.id] || 0;
    
    if (taskCount > 0) {
      const alert = await this.alertController.create({
        header: 'No se puede eliminar',
        message: `Esta categoría tiene ${taskCount} tarea(s) asociada(s). Por favor, elimina o mueve las tareas primero.`,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Eliminar Categoría',
      message: `¿Estás seguro de que quieres eliminar "${category.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.categoryService.deleteCategory(category.id);
            await this.loadData();
          }
        }
      ]
    });

    await alert.present();
  }

  navigateToCategoryForm(categoryId?: string) {
    if (categoryId) {
      this.router.navigate(['/categories/form', categoryId]);
    } else {
      this.router.navigate(['/categories/form']);
    }
  }

  navigateToTasks() {
    this.router.navigate(['/tasks']);
  }
}
