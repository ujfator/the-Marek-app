import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss']
})
export class AddEditItemComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      item: any, origin: string
    },
  ) { }

  public ngOnInit(): void {
		this.form = new FormGroup({
      name: new FormControl(this.data.item ? this.data.item.name : ''),
      amount: new FormControl(),
		});
  }

	public onSubmit(): void {
		if (this.form.valid) {
      const newOrUpdatedItem = {
        name: this.form.value.name,
        amount: this.form.value.amount,
        nature: this.data.origin,
      }
			this.dialogRef.close(newOrUpdatedItem);
		}
  }
}
