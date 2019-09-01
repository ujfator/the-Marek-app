import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddEditItemComponent } from './common/add-edit-item/add-edit-item.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BodyMindComponent } from './body-mind/body-mind.component';
import { FoodComponent } from './food/food.component';
import { MoneyManagerComponent } from './money-manager/money-manager.component';
import { WorkflowManagerComponent } from './workflow-manager/workflow-manager.component';
import { AddEditWorkflowItemComponent } from './workflow-manager/add-edit-workflow-item/add-edit-workflow-item.component'
import { WorkflowManagerService, MoneyManagerService, DialogService, BudgetService, AuthorService } from './common/services';
import { CoreModule } from './common/core.module';

const imports =  [
  AppRoutingModule,
  DragDropModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  CoreModule,
  BrowserModule,
  BrowserAnimationsModule
]

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    FoodComponent,
    BodyMindComponent,
    AddEditItemComponent,
    AddEditWorkflowItemComponent,
    WorkflowManagerComponent,
    MoneyManagerComponent,
  ],
  entryComponents: [
    AddEditItemComponent,
    AddEditWorkflowItemComponent,
  ],
  imports,
  providers: [ WorkflowManagerService, MoneyManagerService, BudgetService, DialogService, AuthorService ],
})
export class AppModule { }
