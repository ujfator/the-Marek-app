import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WorkflowItemModel } from '../../../../server/models'
import { WorkflowManagerService } from 'src/app/common/services';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss']
})
export class AddEditItemComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditItemComponent>,
    public workflowManagerService: WorkflowManagerService,
    @Inject(MAT_DIALOG_DATA) public data: { 
      item: WorkflowItemModel, origin: string
    },
  ) { }

  public ngOnInit(): void {
		this.form = new FormGroup({
      name: new FormControl(this.data.item ? this.data.item.name : ''),
      content: new FormControl(this.data.item ? this.data.item.content : ''),
      price: new FormControl(),
      savings: new FormControl()
		});
  }

	public onSubmit(): void {
		if (this.form.valid) {
      const newOrUpdatedItem = this.data.origin === 'money' ? {
        name: this.form.value.name,
        price: this.form.value.price,
        savings: this.form.value.savings,
      } : {
        name: this.form.value.name,
        content: this.form.value.content,
        container: this.data.item.container || 'new',
        id: this.data.item && this.data.item.id,
      }
			this.dialogRef.close(newOrUpdatedItem);
		}
  }
}
