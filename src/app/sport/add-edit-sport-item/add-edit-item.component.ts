import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SportItemModel, DifficultyModel } from 'server/models';
import { SportService, AuthorService, DifficultyService } from 'src/app/common/services';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss']
})
export class AddEditSportItemComponent implements OnInit {

  public form: FormGroup;
  public difficulties: DifficultyModel[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddEditSportItemComponent>,
    public sportService: SportService,
    public difficultyService: DifficultyService,
    @Inject(MAT_DIALOG_DATA) public data: {
      item: SportItemModel, origin: string, authors: string[],
    },
  ) {
      this.difficultyService.difficulties.subscribe((items)=>{
        if (items) this.difficulties = [...items];
      });
   }

  public ngOnInit(): void {
		this.form = new FormGroup({
      date: new FormControl(this.data.item ? this.data.item.date : new Date()),
      sport: new FormControl(this.data.item ? this.data.item.sport : ''),
      difficulty: new FormControl(this.data.item ? this.data.item.difficulty : ''),
      duration: new FormControl(this.data.item ? this.data.item.duration : 0),
      author: new FormControl(this.data.item ? this.data.item.author : ''),
		});
  }

	public onSubmit(): void {
		if (this.form.valid) {
      const newOrUpdatedItem =  {
        item: {
          date: this.form.value.date,
          sport: this.form.value.sport,
          difficulty: this.form.value.difficulty,
          duration: this.form.value.duration,
          id: this.data.item ? this.data.item.id : '',
          author: this.form.value.author ? this.form.value.author : '',
        },
        origin: this.data.origin,
      }
			this.dialogRef.close(newOrUpdatedItem);
		}
  }
}
