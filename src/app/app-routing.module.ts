import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodyMindComponent } from './body-mind/body-mind.component';
import { FoodComponent } from './food/food.component';
import { MoneyManagerComponent } from './money-manager/money-manager.component';
import { moneyRoutes, MoneyManagerModule } from './money-manager/money-manager.module';
import { WorkflowManagerComponent } from './workflow-manager/workflow-manager.component';

const routes: Routes = [
  { path: 'food', component: FoodComponent },
  { path: 'body-mind', component: BodyMindComponent },
  { path: 'money-manager', component: MoneyManagerComponent, children: moneyRoutes },
  { path: 'workflow-manager', component: WorkflowManagerComponent },
  { path: 'long-term-goals', component: WorkflowManagerComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MoneyManagerModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
