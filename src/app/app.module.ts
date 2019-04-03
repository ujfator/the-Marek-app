import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout';

import { AddEditFoodEntryComponent } from './food/add-edit-food-entry/add-edit-food-entry.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodComponent } from './food/food.component';

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
import { RunningMeditationComponent } from './running-meditation/running-meditation.component';

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
	// MatGridListModule,
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
    AddEditFoodEntryComponent,
    AppComponent,
    FoodComponent,
    RunningMeditationComponent,
  ],
  entryComponents: [AddEditFoodEntryComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
  ],
  providers: [],
})
export class AppModule { }
