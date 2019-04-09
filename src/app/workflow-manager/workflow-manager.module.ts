import { NgModule } from '@angular/core';
import { DragAndDropModule } from 'angular-draggable-droppable';

import { WorkflowManagerComponent } from '../workflow-manager/workflow-manager.component';

@NgModule({
	declarations: [
    WorkflowManagerComponent
  ],
	entryComponents: [],
	imports: [
    DragAndDropModule,
	],
	providers: []
})
export class WorkflowManagerModule {
}
