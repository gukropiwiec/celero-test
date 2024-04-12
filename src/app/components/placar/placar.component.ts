import { Component, Input } from '@angular/core';
import { IPlacar } from '../../interfaces/placar.interface';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-placar',
  standalone: true,
  imports: [],
  templateUrl: './placar.component.html',
  styleUrl: './placar.component.scss'
})
export class PlacarComponent {
  @Input() placar!: IPlacar;

  constructor(private localStorageService: LocalStorageService) {}

  resetPlacar() {
    this.placar.player1.score = '0'
    this.placar.player2.score = '0'
    this.localStorageService.setItem('player1-score', '0')
    this.localStorageService.setItem('player2-score', '0')
  }
}
