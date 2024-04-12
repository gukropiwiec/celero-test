import { Component } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { BoardComponent } from '../../components/board/board.component';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TitleComponent, BoardComponent, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
