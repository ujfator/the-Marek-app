import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QualityComponent } from './quality/quality.component';
import { FoodComponent } from './food/food.component';
import { MoneyComponent } from './money/money.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { SchoolComponent } from './school/school.component';

const routes: Routes = [
  { path: 'food', component: FoodComponent },
  { path: 'day-quality-tab', component: QualityComponent },
  { path: 'money-tab', component: MoneyComponent },
  { path: 'workflow-tab', component: WorkflowComponent },
  { path: 'food-tab', component: FoodComponent },
  { path: 'school-tab', component: SchoolComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
