import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, Inject } from '@angular/core';
import { Secrets, SECRETS } from './secrets.service';
import { Seasons } from './seasons';
import { Observable } from 'rxjs';

type Paging = {
  next: string; 
};

type PictureData = {
  medium: string;
  large: string;
};

export interface AnimeBase  {
  id: number;
  title: string;
  main_picture: PictureData;
};

type AnimeNode = {
  node: AnimeBase;
};

interface AnimeListResponse {
  data: Array<AnimeNode>;
  paging: Paging,
}

type SeasonalAnimeQuery = {
  year: number;
  season: Seasons;
}

export interface SeasonalAnimeResponse extends AnimeListResponse  {
  season: SeasonalAnimeQuery,
};

@Injectable({
  providedIn: 'root'
})
export class MyAnimeListService {
  private httpClient = inject(HttpClient);
  private url = 'https://0i4i346h5c.execute-api.us-east-2.amazonaws.com/getSeasonalAnime';


  getSeasonalAnime(year: number, season: Seasons): Observable<SeasonalAnimeResponse> {
    const url = `${this.url}?year=${year}&season=${season}`;
    return this.httpClient.get<SeasonalAnimeResponse>(url);
  }
}
