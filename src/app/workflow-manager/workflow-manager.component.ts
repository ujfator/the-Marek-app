import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-workflow-manager',
  templateUrl: './workflow-manager.component.html',
  styleUrls: ['./workflow-manager.component.scss']
})
export class WorkflowManagerComponent {

  constructor() { }

  new = [
    'MWG - Trello API calls JS -> PHP',
    'Marek - Money manager tab',
    'Marek - Create chat app',
  ];

  approved = [
    'Marek - Long Term Goals',
    'Bachelor - Text Pavel'
  ];

  commited = [
    'Marek - Workflow Manager',
    'MWG - PHP MYSQL !'
  ]

  done = [
    'Marek - Routing',
    'Marek - Food Tab',
    'Marek - Theming',
    'Marek - Body & Mind Tab',
    'MWG - Charts'
  ]

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
