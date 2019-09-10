import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AddEditItemComponent } from './common/add-edit-item/add-edit-item.component';
import { AddEditSportItemComponent } from './sport/add-edit-sport-item/add-edit-item.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SportComponent } from './sport/sport.component';
import { FoodComponent } from './food/food.component';
import { MoneyComponent } from './money/money.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { AddEditWorkflowItemComponent } from './workflow/add-edit-workflow-item/add-edit-workflow-item.component'
import { WorkflowService, MoneyService, DialogService, BudgetService, AuthorService, SportService, DifficultyService } from './common/services';
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
    SportComponent,
    AddEditItemComponent,
    AddEditWorkflowItemComponent,
    AddEditSportItemComponent,
    WorkflowComponent,
    MoneyComponent,
  ],
  entryComponents: [
    AddEditItemComponent,
    AddEditWorkflowItemComponent,
    AddEditSportItemComponent
  ],
  imports,
  providers: [ WorkflowService, MoneyService, BudgetService, DialogService, AuthorService, SportService, DifficultyService ],
})
export class AppModule { }
