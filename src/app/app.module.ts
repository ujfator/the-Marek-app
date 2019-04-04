import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout';

import { AddEditDialogComponent } from './common/add-edit-dialog/add-edit-dialog.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BodyMindComponent } from './body-mind/body-mind.component';
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
    AppComponent,
    FoodComponent,
    BodyMindComponent,
    AddEditDialogComponent,
  ],
  entryComponents: [
    AddEditDialogComponent,
  ],
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
