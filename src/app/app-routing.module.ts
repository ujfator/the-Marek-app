import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodyMindComponent } from './body-mind/body-mind.component';
import { FoodComponent } from './food/food.component';
import { WorkflowManagerComponent } from './workflow-manager/workflow-manager.component';

const routes: Routes = [
  { path: 'food', component: FoodComponent, pathMatch: 'full' },
  { path: 'body-mind', component: BodyMindComponent, pathMatch: 'full' },
  { path: 'workflow-manager', component: WorkflowManagerComponent, pathMatch: 'full' },
  { path: 'long-term-goals', component: WorkflowManagerComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
