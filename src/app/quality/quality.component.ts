import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Quality } from 'server/models';
import { QualityService } from '../common/services/quality.service';
import { DialogService } from '../common/services/dialog.service';
import { AuthorService } from '../common/services/author.service';
import { DifficultyService } from '../common/services/difficulty.service';
import { AddEditQualityItemComponent } from './add-edit-quality-item/add-edit-item.component';


@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})

export class QualityComponent {

  displayedColumns: string[] = ['date', 'dayQuality', 'wakeUp', 'goToBed', 'sleepTime', 'mt', 'excercise', 'deepWorkTime' ,'author', 'edit'];
  qualities: Quality[] = [];
  allItems: Quality[] = [];

  constructor(
    protected dialog: MatDialog,
    protected qualityService: QualityService,
    protected dialogService: DialogService,
    protected authorService: AuthorService,
    protected difficultyService: DifficultyService,
  ) {
    this.qualityService.items.subscribe(async (items) => {
      if (items) {
        this.allItems = await [...items];
        if (localStorage.getItem('author')) {
          this.createDataSource(localStorage.getItem('author'))
        } else this.qualities = [...items];
      }
    });

    this.authorService.author.subscribe((author) => {
      if (author && author !== 'Oba') {
        this.createDataSource(author);
      } else if (author === 'Oba') this.qualities = [...this.allItems];
    });
  }

  addOrEditEntry(entry?: Quality) {
    const dialogRef = this.dialog.open(AddEditQualityItemComponent, {
      width: '500px',
      data: entry || null,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      result.id ? this.qualityService.patchItem(result) : this.qualityService.addItem(result);
    });
  }

  createDataSource (author?: string) {
    this.qualities = [];
    this.allItems && this.allItems.forEach(element => {
      if (element.author === author) this.qualities.push(element);
    });
  }

  delete(entry: Quality) {
    this.qualityService.deleteItem(entry.id);
  }

  minutes(element): string {
    if (element) {
      if (element.duration > 1) {
        return 'minutes'
      } else return 'minute'
    }
  }

}
