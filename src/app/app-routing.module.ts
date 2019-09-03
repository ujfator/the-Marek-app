import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SportComponent } from './sport/sport.component';
import { FoodComponent } from './food/food.component';
import { MoneyComponent } from './money/money.component';
import { moneyRoutes, MoneyModule } from './money/money.module';
import { WorkflowComponent } from './workflow/workflow.component';

const routes: Routes = [
  { path: 'food', component: FoodComponent },
  { path: 'sport-tab', component: SportComponent },
  { path: 'money-tab', component: MoneyComponent, children: moneyRoutes },
  { path: 'workflow-tab', component: WorkflowComponent },
  { path: 'long-term-goals', component: WorkflowComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MoneyModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
