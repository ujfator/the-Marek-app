import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditSchoolItemComponent } from './add-edit-item.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('AddEditSchoolItemComponent', () => {
	let component: AddEditSchoolItemComponent;
	let fixture: ComponentFixture<AddEditSchoolItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AddEditSchoolItemComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddEditSchoolItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
