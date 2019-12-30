import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QualityComponent } from './modules/quality/quality.component';
import { FoodComponent } from './modules/food/food.component';
import { MoneyComponent } from './modules/money/money.component';
import { WorkflowComponent } from './modules/workflow/workflow.component';
import { SchoolComponent } from './modules/school/school.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
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
