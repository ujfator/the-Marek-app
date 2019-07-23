import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TableEntryInterface } from '../../common/interfaces/table-entry.interface';

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.scss']
})
export class AddEditDialogComponent implements OnInit {

  public form: FormGroup;
  public keys: string[];

  constructor(
    public dialogRef: MatDialogRef<AddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TableEntryInterface,
  ) { }

  public ngOnInit(): void {
    this.keys = Object.keys(this.data);
		this.form = new FormGroup({
			date: new FormControl((this.data && this.data[this.keys[0]] ? this.data[this.keys[0]].toISOString().substr(0, 10) : new Date().toISOString().substr(0, 10))),
			column1: new FormControl((this.data && this.data[this.keys[1]] ? this.data[this.keys[1]] : ''), Validators.required),
			column2: new FormControl((this.data && this.data[this.keys[2]] ? this.data[this.keys[2]] : ''), ),
			column3: new FormControl((this.data && this.data[this.keys[3]] ? this.data[this.keys[3]] : ''), Validators.required)
		});
  }

  public capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


	public onSubmit(): void {
		if (this.form.valid) {
			const newOrUpdatedEntry = <TableEntryInterface>{
				date: new Date(this.form.value.date),
				column1: this.form.value.running,
				column2: this.form.value.meditation,
				column3: this.form.value.emotion,
      };
      console.log('new or updated', newOrUpdatedEntry);
			this.dialogRef.close();
		}
  }
}
