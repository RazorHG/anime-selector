import { Component, inject, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectorComponent, SortedAnime } from './features/selector/selector.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Seasons } from './core/seasons';
import { AnimeBase, MyAnimeListService } from './core/myanimelist.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SelectorComponent,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private myAnimeListService = inject(MyAnimeListService);
  title = 'anime-selector';
  selectedYear!: number;
  selectedSeason!: Seasons;
  animeList: Array<AnimeBase> = [];

  seasons = [
    Seasons.spring,
    Seasons.summer,
    Seasons.fall,
    Seasons.winter,
  ];

  years = [
    2025, 2024, 2023,
  ];

  loadAnime() {
    this.selectedYear
    this.myAnimeListService.getSeasonalAnime(this.selectedYear, this.selectedSeason).subscribe((response) => {
      const animeList = response.data.map((node) => {
        return node.node
      })
      this.animeList = animeList;
    })
  }

  updateSortedAnime(event: SortedAnime) {
    console.log('app event', event);
  }

}
