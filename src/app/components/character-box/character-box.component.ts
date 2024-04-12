import { Component, Input } from '@angular/core';
import { ICharacter } from '../../interfaces/character.interface';

@Component({
  selector: 'app-character-box',
  standalone: true,
  imports: [],
  templateUrl: './character-box.component.html',
  styleUrl: './character-box.component.scss'
})
export class CharacterBoxComponent {
    @Input() character!: ICharacter;
}
