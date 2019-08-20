import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { Routes, RouterModule } from '@angular/router';
import { MoneyItemComponent } from './money-item/money-item.component';
import { MoneyManagerService } from '../common/services';
import { CoreModule } from '../common/core.module';
import { BudgetComponent } from './budget/budget.component';

export const moneyRoutes: Routes = [
	{ path: '', redirectTo: './', pathMatch: 'full' },
	{ path: 'moneyItem', component: BudgetComponent },
	{ path: 'moneyItem/:id', component: MoneyItemComponent },
	{ path: '**', redirectTo: 'moneyItem' }
];
@NgModule({
	declarations: [
		MoneyItemComponent,
		BudgetComponent,
	],
	entryComponents: [
	],
	exports: [
		MoneyItemComponent
	],
	imports: [
		RouterModule,
		CoreModule,
		ChartsModule,
		CommonModule
	],
	providers: [
		MoneyManagerService
	]
})
export class MoneyManagerModule { }
