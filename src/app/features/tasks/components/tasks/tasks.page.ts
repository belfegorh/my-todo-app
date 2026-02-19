import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../../../models/task.model';
import { Category } from '../../../../models/category.model';
import { TaskService } from '../../../../services/task.service';
import { CategoryService } from '../../../../services/category.service';
import { FeatureFlagsService } from '../../../../services/feature-flags.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: false,
})
export class TasksPage implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  filteredTasks: Task[] = [];
  selectedCategoryId: string = 'all';
  showCategoryFilter$!: Observable<boolean>;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private router: Router,
    private alertController: AlertController,
    private featureFlagsService: FeatureFlagsService
  ) {}

  async ngOnInit() {
    this.showCategoryFilter$ = this.featureFlagsService.showCategoryFilter$;
    await this.loadData();
  }

  async ionViewWillEnter() {
    await this.loadData();
  }

  async loadData() {
    this.tasks = await this.taskService.getTasks();
    this.categories = await this.categoryService.getCategories();
    this.filterTasks();
  }

  filterTasks() {
    if (this.selectedCategoryId === 'all') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(
        task => task.categoryId === this.selectedCategoryId
      );
    }
  }

  onCategoryChange(event: any) {
    this.selectedCategoryId = event.detail.value;
    this.filterTasks();
  }

  async toggleTask(task: Task) {
    await this.taskService.toggleTask(task.id);
    await this.loadData();
  }

  async deleteTask(task: Task) {
    const alert = await this.alertController.create({
      header: 'Eliminar Tarea',
      message: `¿Estás seguro de que quieres eliminar "${task.title}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.taskService.deleteTask(task.id);
            await this.loadData();
          }
        }
      ]
    });

    await alert.present();
  }

  navigateToTaskForm(taskId?: string) {
    if (taskId) {
      this.router.navigate(['/tasks/form', taskId]);
    } else {
      this.router.navigate(['/tasks/form']);
    }
  }

  navigateToCategories() {
    this.router.navigate(['/categories']);
  }

  getCategoryName(categoryId?: string): string {
    if (!categoryId) return 'Sin categoría';
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Sin categoría';
  }

  getCategoryColor(categoryId?: string): string {
    if (!categoryId) return 'medium';
    const category = this.categories.find(c => c.id === categoryId);
    return category?.color || 'medium';
  }
}
