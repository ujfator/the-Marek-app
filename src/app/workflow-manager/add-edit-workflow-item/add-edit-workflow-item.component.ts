import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WorkflowItemModel } from '../../../../server/models'
import { WorkflowManagerService } from 'src/app/common/services';

@Component({
  selector: 'app-add-edit-workflow-item',
  templateUrl: './add-edit-workflow-item.component.html',
  styleUrls: ['./add-edit-workflow-item.component.scss']
})
export class AddEditWorkflowItemComponent implements OnInit {

  public form: FormGroup;
  public keys: string[];

  constructor(
    public dialogRef: MatDialogRef<AddEditWorkflowItemComponent>,
    public workflowManagerService: WorkflowManagerService,
    @Inject(MAT_DIALOG_DATA) public data: WorkflowItemModel,
  ) { }

  public ngOnInit(): void {
		this.form = new FormGroup({
      name: new FormControl(this.data ? this.data.name : ''),
      content: new FormControl(this.data ? this.data.content : ''),
		});
  }


	public onSubmit(): void {
		if (this.form.valid) {
      console.log('new or updated', this.form.value);
      const newOrUpdatedItem = {
        name: this.form.value.name,
        content: this.form.value.content,
        container: 'new',
        id: this.data && this.data.id,
      }
      this.data ? this.workflowManagerService.patchItem(newOrUpdatedItem) : this.workflowManagerService.addItem(newOrUpdatedItem);
			this.dialogRef.close();
		}
  }
}
