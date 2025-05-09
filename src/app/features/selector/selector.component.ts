import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
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
import { WatchlistService } from '../../core/watchlist.service';

export interface SortedAnime {
  willWatch: AnimeBase[],
  wontWatch: AnimeBase[],
}

@Component({
  selector: 'app-selector',
  imports: [
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
  private watchListService = inject(WatchlistService);
  

  willWatchItems: Array<AnimeBase> = this.watchListService.getWillWatch();
  wontWatchItems: Array<AnimeBase> = this.watchListService.getWontWatch();

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
    this.watchListService.setWillWatch(this.willWatchItems);
    this.watchListService.setWontWatch(this.wontWatchItems);
    this.sortedChangeEvent.emit({
      willWatch: this.willWatchItems,
      wontWatch: this.wontWatchItems,
    });
  }
}
