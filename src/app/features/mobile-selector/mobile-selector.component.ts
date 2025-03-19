import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common'
import {MatCardModule} from '@angular/material/card';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
  CdkDragPlaceholder,
} from '@angular/cdk/drag-drop';
import { AnimeBase } from '../../core/myanimelist.service';
import { WatchlistService } from '../../core/watchlist.service';
import { SortedAnime } from '../selector/selector.component';

@Component({
  selector: 'app-mobile-selector',
  imports: [
    CommonModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    MatCardModule,
    NgOptimizedImage,
    CdkDragPlaceholder,
  ],
  templateUrl: './mobile-selector.component.html',
  styleUrl: './mobile-selector.component.scss'
})
export class MobileSelectorComponent {
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
