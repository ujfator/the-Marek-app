import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WorkflowManagerService } from 'src/app/common/services/workflow-manager.service';
  import { from } from 'rxjs';

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
  ) { }

  public ngOnInit(): void {
		this.form = new FormGroup({
      title: new FormControl(),
      content: new FormControl(),
		});
  }


	public onSubmit(): void {
		if (this.form.valid) {
      console.log('new or updated', this.form.value);
      const newItem = {
        title: this.form.value.title,
        content: this.form.value.content,
        container: 'new'
      }
      this.workflowManagerService.addItem(newItem);
			this.dialogRef.close();
		}
  }
}
