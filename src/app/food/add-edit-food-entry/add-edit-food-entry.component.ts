import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FoodEntry } from '../food.component';

@Component({
  selector: 'app-add-edit-food-entry',
  templateUrl: './add-edit-food-entry.component.html',
  styleUrls: ['./add-edit-food-entry.component.scss']
})
export class AddEditFoodEntryComponent implements OnInit {

  public foodForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditFoodEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FoodEntry,
  ) { }

  public ngOnInit(): void {
		this.foodForm = new FormGroup({
			foodDate: new FormControl((this.data.date ? new Date(this.data.date) : '')),
			foodBreakfast: new FormControl((this.data.breakfast ? this.data.breakfast : ''), Validators.required),
			foodLunch: new FormControl((this.data.lunch ? this.data.lunch : ''), ),
			foodDinner: new FormControl((this.data.dinner ? this.data.dinner : ''), Validators.required)
		});
	}


	public onSubmit(): void {
		if (this.foodForm.valid) {
			const newOrUpdatedFoodEntry = <FoodEntry>{
				date: this.foodForm.value.foodDate,
				breakfast: this.foodForm.value.foodBreakfast,
				lunch: this.foodForm.value.foodLunch,
				dinner: this.foodForm.value.dinner,
      };
      console.log('new or updated', newOrUpdatedFoodEntry);
			this.dialogRef.close();
		}
	}

}
