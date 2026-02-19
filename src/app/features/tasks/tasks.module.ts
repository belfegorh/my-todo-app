import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TasksPageRoutingModule } from './tasks-routing.module';
import { TasksPage } from './components/tasks/tasks.page';
import { TaskFormPage } from './components/task-form/task-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksPageRoutingModule
  ],
  declarations: [TasksPage, TaskFormPage]
})
export class TasksPageModule {}
