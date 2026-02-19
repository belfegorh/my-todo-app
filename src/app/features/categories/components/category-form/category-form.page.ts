import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.page.html',
  styleUrls: ['./category-form.page.scss'],
  standalone: false,
})
export class CategoryFormPage implements OnInit {
  category: Category = {
    id: '',
    name: '',
    color: 'primary',
    icon: 'pricetag-outline',
    createdAt: new Date()
  };
  isEditMode = false;

  colors = [
    { value: 'primary', label: 'Azul' },
    { value: 'secondary', label: 'Morado' },
    { value: 'tertiary', label: 'Rosa' },
    { value: 'success', label: 'Verde' },
    { value: 'warning', label: 'Amarillo' },
    { value: 'danger', label: 'Rojo' },
    { value: 'dark', label: 'Negro' },
    { value: 'medium', label: 'Gris' }
  ];

  icons = [
    'pricetag-outline',
    'home-outline',
    'briefcase-outline',
    'heart-outline',
    'star-outline',
    'flag-outline',
    'bookmark-outline',
    'cart-outline',
    'fitness-outline',
    'school-outline'
  ];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.isEditMode = true;
      await this.loadCategory(categoryId);
    }
  }

  async loadCategory(id: string) {
    const loadedCategory = await this.categoryService.getCategory(id);
    if (loadedCategory) {
      this.category = { ...loadedCategory };
    }
  }

  async saveCategory() {
    if (!this.category.name.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El nombre es obligatorio',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    try {
      if (this.isEditMode) {
        await this.categoryService.updateCategory(this.category.id, {
          name: this.category.name,
          color: this.category.color,
          icon: this.category.icon
        });
      } else {
        await this.categoryService.createCategory({
          name: this.category.name,
          color: this.category.color,
          icon: this.category.icon
        });
      }
      this.router.navigate(['/categories']);
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo guardar la categoría',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  cancel() {
    this.router.navigate(['/categories']);
  }
}
