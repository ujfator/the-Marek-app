import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-edit-workflow-item',
  templateUrl: './add-edit-workflow-item.component.html',
  styleUrls: ['./add-edit-workflow-item.component.scss']
})
export class AddEditWorkflowItemComponent implements OnInit {

  public form: FormGroup;
  public authors: String[] = [
    'Marek', 'Terezka', 'Sunéčko'
  ]

  constructor(
    public dialogRef: MatDialogRef<AddEditWorkflowItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      item: any, origin: string
    },
  ) { }

  public ngOnInit(): void {
		this.form = new FormGroup({
      name: new FormControl(this.data.item ? this.data.item.name : ''),
      content: new FormControl(this.data.item ? this.data.item.content : ''),
      author: new FormControl(this.data.item ? this.data.item.author : ''),
      dueDate: new FormControl(this.data.item ? this.data.item.dueDate : '')
		});
  }

	public onSubmit(): void {
		if (this.form.valid) {
      const newOrUpdatedItem =  {
        name: this.form.value.name,
        content: this.form.value.content,
        container: (this.data.item && this.data.item.container) || 'new',
        author: this.form.value.author,
        dueDate: this.form.value.dueDate,
        id: this.data.item && this.data.item.id,
      }
			this.dialogRef.close(newOrUpdatedItem);
		}
  }
}
