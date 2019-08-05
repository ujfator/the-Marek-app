import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AddEditItemComponent } from './common/add-edit-item/add-edit-item.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BodyMindComponent } from './body-mind/body-mind.component';
import { FoodComponent } from './food/food.component';
import { MoneyManagerComponent } from './money-manager/money-manager.component';
import { WorkflowManagerComponent } from './workflow-manager/workflow-manager.component';
import { WorkflowManagerService, MoneyManagerService } from './common/services';
import { MaterialModule } from './common/material.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    FoodComponent,
    BodyMindComponent,
    AddEditItemComponent,
    WorkflowManagerComponent,
    MoneyManagerComponent,
  ],
  entryComponents: [
    AddEditItemComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [ WorkflowManagerService, MoneyManagerService ],
})
export class AppModule { }
