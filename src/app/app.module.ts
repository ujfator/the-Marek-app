import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AddEditDialogComponent } from './common/add-edit-dialog/add-edit-dialog.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BodyMindComponent } from './body-mind/body-mind.component';
import { FoodComponent } from './food/food.component';
import { MoneyManagerComponent } from './money-manager/money-manager.component';
import { WorkflowManagerComponent } from './workflow-manager/workflow-manager.component';
import { WorkflowManagerService } from './common/services/workflow-manager.service';
import { AddEditWorkflowItemComponent } from './workflow-manager/add-edit-workflow-item/add-edit-workflow-item.component';

import {
	MatAutocompleteModule,
	MatBadgeModule,
	MatBottomSheetModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDatepickerModule,
	MatDialogModule,
	MatDividerModule,
	MatExpansionModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatRippleModule,
	MatSelectModule,
	MatSidenavModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatSnackBarModule,
	MatSortModule,
	MatStepperModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatTooltipModule,
	MatTreeModule,
} from '@angular/material';

const materialModules = [
	// CdkTableModule,
	// CdkTreeModule,,
	// MatAutocompleteModule,
	// MatBadgeModule,
	// MatBottomSheetModule,
	MatButtonModule,
	// MatButtonToggleModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	// MatStepperModule,
	MatDatepickerModule,
	MatDialogModule,
	// MatDividerModule,
	MatExpansionModule,
  MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	// MatMenuModule,
	MatNativeDateModule,
	// MatPaginatorModule,
	MatProgressBarModule,
	// MatProgressSpinnerModule,
	// MatRadioModule,
	// MatRippleModule,
	MatSelectModule,
	MatSidenavModule,
	// MatSliderModule,
	// MatSlideToggleModule,
	// MatSnackBarModule,
	MatSortModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatTooltipModule,
	MatTreeModule,
	// ScrollingModule,
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    FoodComponent,
    BodyMindComponent,
    AddEditDialogComponent,
    AddEditWorkflowItemComponent,
    WorkflowManagerComponent,
    MoneyManagerComponent,
  ],
  entryComponents: [
    AddEditDialogComponent,
    AddEditWorkflowItemComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    DragDropModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...materialModules,
  ],
  providers: [ WorkflowManagerService ],
})
export class AppModule { }
