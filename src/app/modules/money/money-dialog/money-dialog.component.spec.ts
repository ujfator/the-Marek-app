import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MoneyDialogComponent } from './money-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('MoneyDialogComponent', () => {
	let component: MoneyDialogComponent;
	let fixture: ComponentFixture<MoneyDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MoneyDialogComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MoneyDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
