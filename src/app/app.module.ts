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
import { CoreModule } from './common/core.module';
import { AddEditFoodItemComponent } from './food/add-edit-food-item/add-edit-item.component';
import { WorkflowService } from './common/services/workflow.service';
import { MoneyService } from './common/services/money.service';
import { BudgetService } from './common/services/budget.service';
import { DialogService } from './common/services/dialog.service';
import { AuthorService } from './common/services/author.service';
import { SportService } from './common/services/sport.service';
import { DifficultyService } from './common/services/difficulty.service';
import { FoodService } from './common/services/food.service';

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
    AddEditFoodItemComponent,
    WorkflowComponent,
    MoneyComponent,
  ],
  entryComponents: [
    AddEditItemComponent,
    AddEditWorkflowItemComponent,
    AddEditSportItemComponent,
    AddEditFoodItemComponent
  ],
  imports,
  providers: [ WorkflowService, MoneyService, BudgetService, DialogService, AuthorService, 
    SportService, DifficultyService, FoodService ],
})
export class AppModule { }
