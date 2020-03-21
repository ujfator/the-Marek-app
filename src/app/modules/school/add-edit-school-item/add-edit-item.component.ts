import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { School } from 'server/models';
import { DifficultyService } from 'src/app/common/services/api-calls/difficulty.service';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss']
})
export class AddEditSchoolItemComponent implements OnInit {

  public form: FormGroup;
  public difficulties: string[];

  constructor(
    public dialogRef: MatDialogRef<AddEditSchoolItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      item: School, origin: string, authors: string[],
    },
    public difficultyService: DifficultyService,
  ) {
    this.difficultyService.difficulties.subscribe((items)=>{
      if (items) this.difficulties = [...items];
    });
  }

  public ngOnInit(): void {
		this.form = new FormGroup({
      date: new FormControl(this.data.item ? this.data.item.date : new Date()),
      subject: new FormControl(this.data.item ? this.data.item.subject : ''),
      difficulty: new FormControl(this.data.item ? this.data.item.difficulty : ''),
      typeOfTest: new FormControl(this.data.item ? this.data.item.typeOfTest : ''),
      author: new FormControl(this.data.item ? this.data.item.author : ''),
		});
  }

	public onSubmit(): void {
		if (this.form.valid) {
      const newOrUpdatedItem =  {
        item: {
          date: this.form.value.date,
          subject: this.form.value.subject,
          difficulty: this.form.value.lunch,
          typeOfTest: this.form.value.typeOfTest,
          id: this.data.item ? this.data.item.id : '',
          author: this.form.value.author ? this.form.value.author : '',
        },
        origin: this.data.origin,
      }
			this.dialogRef.close(newOrUpdatedItem);
		}
  }
}
