import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { A11yModule } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MarekCommon } from './components/common.component';

const materialModules = [
	A11yModule, // ARIA accessibility
	// CdkTableModule,
	// CdkTreeModule,
	// DragDropModule,
	MatAutocompleteModule,
	// MatBadgeModule,
	// MatBottomSheetModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCardModule,
	MatCheckboxModule,
	// MatChipsModule,
	// MatStepperModule,
	MatDatepickerModule,
	MatDialogModule,
	MatDividerModule,
	MatExpansionModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	// MatMomentDateModule,
	MatNativeDateModule,
	// MatPaginatorModule,
	// MatProgressBarModule,
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
	// MatTreeModule
	// ScrollingModule,
];

@NgModule({
	declarations: [],
	entryComponents: [],
	exports: [...materialModules, FlexLayoutModule, MarekCommon],
	imports: [CommonModule, ...materialModules, FlexLayoutModule, FormsModule, ReactiveFormsModule],
	providers: [],
})
export class CoreModule {}
