import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesPage } from './components/categories/categories.page';
import { CategoryFormPage } from './components/category-form/category-form.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage
  },
  {
    path: 'form',
    component: CategoryFormPage
  },
  {
    path: 'form/:id',
    component: CategoryFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesPageRoutingModule {}
