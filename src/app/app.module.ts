import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddEditItemComponent } from './common/add-edit-item/add-edit-item.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WorkflowComponent } from './modules/workflow/workflow.component';
import { AddEditWorkflowItemComponent } from './modules/workflow/add-edit-workflow-item/add-edit-workflow-item.component';
import { CoreModule } from './common/core.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MoneyComponent } from './modules/money/money.component';
import { MoneyTileComponent } from './modules/money/money-tile/money-tile.component';
import { MoneyDialogComponent } from './modules/money/money-dialog/money-dialog.component';
import { HttpCallsInterceptor } from './common/http-interceptor/http-interceptor';

const imports = [
	AppRoutingModule,
	DragDropModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
	CoreModule,
	BrowserModule,
	BrowserAnimationsModule,
];

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		AddEditItemComponent,
		AddEditWorkflowItemComponent,
		WorkflowComponent,
		MoneyComponent,
		LoginComponent,
		MoneyTileComponent,
		MoneyDialogComponent,
	],
	entryComponents: [
		AddEditItemComponent,
		AddEditWorkflowItemComponent,
		MoneyDialogComponent,
	],
	imports,
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpCallsInterceptor,
			multi: true,
		},
	],
})
export class AppModule {}
