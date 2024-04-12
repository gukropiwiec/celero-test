import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-character-box',
  standalone: true,
  imports: [],
  templateUrl: './character-box.component.html',
  styleUrl: './character-box.component.scss'
})
export class CharacterBoxComponent {
    @Input() character: any;
}
