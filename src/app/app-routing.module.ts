import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SportComponent } from './sport/sport.component';
import { FoodComponent } from './food/food.component';
import { MoneyComponent } from './money/money.component';
import { WorkflowComponent } from './workflow/workflow.component';

const routes: Routes = [
  { path: 'food', component: FoodComponent },
  { path: 'sport-tab', component: SportComponent },
  { path: 'money-tab', component: MoneyComponent },
  { path: 'workflow-tab', component: WorkflowComponent },
  { path: 'food-tab', component: FoodComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
