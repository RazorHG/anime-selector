import { Injectable } from '@angular/core';
import { AnimeBase } from '../core/myanimelist.service';
import { isEqual } from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private willWatch: AnimeBase[] = [];
  private wontWatch: AnimeBase[] = [];
  
  constructor() { }

  removeWillWatch(anime: AnimeBase, index?: number) {
    if (typeof index === 'number') {
      this.willWatch.splice(index, 1);
    } else {
      const index = this.willWatch.findIndex((target) => { return isEqual(target, anime)});
      if (index) {
        this.willWatch.splice(index, 1);
      }
    }
  };


  addWillWatch(anime: AnimeBase, index?: number) {
    if (typeof index === 'number') {
      this.willWatch.splice(index, 0, anime);
    } else {
      this.willWatch.push(anime);
    }
  }


  setWillWatch(anime: AnimeBase[]) {
    this.willWatch = anime;
  };

  removeWontWatch(anime: AnimeBase, index?: number) {
    if (typeof index === 'number') {
      this.willWatch.splice(index, 1);
    } else {
      const index = this.willWatch.findIndex((target) => { return isEqual(target, anime)});
      if (index) {
        this.willWatch.splice(index, 1);
      }
    }
  };


  addWontWatch(anime: AnimeBase, index?: number) {
    if (typeof index === 'number') {
      this.wontWatch.splice(index, 0, anime);
    } else {
      this.wontWatch.push(anime);
    }
  }


  setWontWatch(anime: AnimeBase[]) {
    this.wontWatch = anime;
  };
  
  getWillWatch() {
    return this.willWatch;
  }

  getWontWatch() {
    return this.wontWatch;
  }

}
