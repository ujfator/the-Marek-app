import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoneyComponent } from './modules/money/money.component';
import { WorkflowComponent } from './modules/workflow/workflow.component';
import { LoginComponent } from './login/login.component';
import { AuthorizationGuard } from './common/guards/authorization-guard';
import { BrewingComponent } from './modules/brewing.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
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
		path: 'brewing',
		component: BrewingComponent,
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
