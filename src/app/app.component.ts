import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectorComponent } from './features/selector/selector.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'anime-selector';
}
