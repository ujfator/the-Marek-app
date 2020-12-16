import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QualityComponent } from './modules/quality/quality.component';
import { FoodComponent } from './modules/food/food.component';
import { MoneyComponent } from './modules/money/money.component';
import { WorkflowComponent } from './modules/workflow/workflow.component';
import { SchoolComponent } from './modules/school/school.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './common/guards/login-guard';
import { AuthorizationGuard } from './common/guards/authorization-guard';

const routes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
	{
		path: 'food',
		component: FoodComponent,
		canActivate: [AuthorizationGuard],
	},
	{
		path: 'day-quality-tab',
		component: QualityComponent,
		canActivate: [AuthorizationGuard],
	},
	{
		path: 'money-tab',
		component: MoneyComponent,
		canActivate: [AuthorizationGuard],
	},
	{
		path: 'workflow-tab',
		component: WorkflowComponent,
		canActivate: [AuthorizationGuard],
	},
	{
		path: 'food-tab',
		component: FoodComponent,
		canActivate: [AuthorizationGuard],
	},
	{
		path: 'school-tab',
		component: SchoolComponent,
		canActivate: [AuthorizationGuard],
	},
	{
		redirectTo: 'login',
		path: '',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
