import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { NgOptimizedImage } from '@angular/common'
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AnimeBase } from '../../core/myanimelist.service';

export interface SortedAnime {
  willWatch: AnimeBase[],
  wonWatch: AnimeBase[],
}

@Component({
  selector: 'app-selector',
  imports: [
    MatGridList,
    MatGridTile,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    MatCardModule,
    NgOptimizedImage,
  ],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss'
})
export class SelectorComponent {
  @Input() unsortedItems: Array<AnimeBase> = [];
  @Output() sortedChangeEvent = new EventEmitter<SortedAnime>()

  willWatchItems: Array<AnimeBase> = [];
  wontWatchItems: Array<AnimeBase> = [];

  drop(event: CdkDragDrop<AnimeBase[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.sortedChangeEvent.emit({
      willWatch: this.willWatchItems,
      wonWatch: this.wontWatchItems,
    });
  }
}
