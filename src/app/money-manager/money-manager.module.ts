import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { Routes, RouterModule } from '@angular/router';
import { MoneyItemComponent } from './money-item/money-item.component';
import { MoneyManagerService } from '../common/services';
import { MaterialModule } from '../common/material.module';

export const moneyRoutes: Routes = [
	{ path: '', redirectTo: './', pathMatch: 'full' },
	{ path: 'item', component: MoneyItemComponent },
	{ path: 'item/:id', component: MoneyItemComponent },
	{ path: '**', redirectTo: 'item' }
];
@NgModule({
	declarations: [
		MoneyItemComponent,
	],
	entryComponents: [
	],
	exports: [
		MoneyItemComponent
	],
	imports: [
		RouterModule,
		MaterialModule,
		ChartsModule
	],
	providers: [
		MoneyManagerService
	]
})
export class MoneyManagerModule { }
