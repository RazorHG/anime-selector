import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, Inject } from '@angular/core';
import { Secrets, SECRETS } from './secrets.service';
import { Seasons } from './seasons';

@Injectable({
  providedIn: 'root'
})
export class MyAnimeListService {
  private httpClient = inject(HttpClient);
  private clientID: string;
  private headers: HttpHeaders;
  private malURL = 'https://api.myanimelist.net/v2/anime/season/';

  constructor(@Inject(SECRETS) secrets: Secrets) {
    this.clientID = secrets.clientID;
    this.headers = new HttpHeaders().set('X-MAL-CLIENT-ID', this.clientID);
  }
  getSeasonalAnime(year: number, season: Seasons) {
    const url = `${this.malURL}${year}/${season}`;
    return this.httpClient.get(url, { headers: this.headers });
  }
}
