import { Component, inject, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectorComponent, SortedAnime } from './features/selector/selector.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Seasons } from './core/seasons';
import { AnimeBase, MyAnimeListService } from './core/myanimelist.service';
import { TitleCasePipe } from '@angular/common';

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
    TitleCasePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private myAnimeListService = inject(MyAnimeListService);

  queryForm = new FormGroup({
    selectedYear: new FormControl<number>(2025, Validators.required),
    selectedSeason: new FormControl<Seasons>(Seasons.spring, Validators.required),
    willWatch: new FormControl<AnimeBase[]>([]),
    wontWatch: new FormControl<AnimeBase[]>([]),
    updates: new FormControl<AnimeBase[]>([], Validators.minLength(1)),
  });

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
    const selectedYear = this.queryForm.get('selectedYear')?.value;
    const selectedSeason = this.queryForm.get('selectedSeason')?.value;
    console.log(selectedYear, selectedSeason);
    if (selectedYear && selectedSeason) {
      this.myAnimeListService.getSeasonalAnime(selectedYear, selectedSeason).subscribe((response) => {
        const animeList = response.data.map((node) => {
          return node.node
        })
        // filter out already sorted anime
        this.animeList = animeList.filter((anime) => {
          return !(this.queryForm.get('updates')?.value as AnimeBase[]).find((updatedAnime) => { return updatedAnime.id === anime.id; })
        });
        this.queryForm.updateValueAndValidity();
      })
    }
  }

  saveAnime() {
    console.log(this.queryForm.get('updates')?.valid);
  }

  updateSortedAnime(event: SortedAnime) {
    const updates = [ ...event.willWatch, ...event.wonWatch ];
    console.log('updates', updates);
    this.queryForm.patchValue({ updates });
    this.queryForm.updateValueAndValidity();
    console.log(this.queryForm.get('updates')?.errors);
  }

}
