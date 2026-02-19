import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksPage } from './components/tasks/tasks.page';
import { TaskFormPage } from './components/task-form/task-form.page';

const routes: Routes = [
  {
    path: '',
    component: TasksPage
  },
  {
    path: 'form',
    component: TaskFormPage
  },
  {
    path: 'form/:id',
    component: TaskFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksPageRoutingModule {}
