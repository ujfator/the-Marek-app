import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTileComponent } from './money-tile.component';

describe('MoneyTileComponent', () => {
	let component: MoneyTileComponent;
	let fixture: ComponentFixture<MoneyTileComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MoneyTileComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MoneyTileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
