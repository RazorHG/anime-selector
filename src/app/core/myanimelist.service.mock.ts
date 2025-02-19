import { Injectable } from '@angular/core';
import { Seasons } from './seasons';
import { Observable, of } from 'rxjs';
import { SeasonalAnimeResponse } from './myanimelist.service';
import { ANIME_MOCK } from '../shared/seasonal_anime';


@Injectable({
  providedIn: 'root'
})
export class MockMyAnimeListService {
  getSeasonalAnime(year: number, season: Seasons): Observable<SeasonalAnimeResponse> {
    return of(ANIME_MOCK as SeasonalAnimeResponse);
  }
}
