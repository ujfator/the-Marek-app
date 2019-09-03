import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SportItemModel } from 'server/models';
import { SportService } from 'src/app/common/services';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss']
})
export class AddEditSportItemComponent implements OnInit {

  public form: FormGroup;
  public difficulties: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddEditSportItemComponent>,
    public sportService: SportService,
    @Inject(MAT_DIALOG_DATA) public data: {
      item: SportItemModel,
      origin: string,
    },
  ) {
      this.sportService.items.subscribe((items)=>{
        if (items) {
          items.forEach((item) => this.difficulties.push(item.difficulty));
        }
        console.log(this.difficulties);
      })
   }

  public ngOnInit(): void {
		this.form = new FormGroup({
      date: new FormControl(this.data ? this.data.item.date : new Date()),
      sport: new FormControl(this.data ? this.data.item.sport : ''),
      difficulty: new FormControl(this.data ? this.data.item.difficulty : ''),
      duration: new FormControl(this.data ? this.data.item.duration : 0)
		});
  }

	public onSubmit(): void {
		if (this.form.valid) {
      const newOrUpdatedItem =  {
        date: this.form.value.date,
        sport: this.form.value.sport,
        difficulty: this.form.value.difficulty,
        duration: this.form.value.duration,
      }
			this.dialogRef.close(newOrUpdatedItem);
		}
  }
}
