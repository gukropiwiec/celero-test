import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { ModalSelectCharacterComponent } from '../modal-select-character/modal-select-character.component';
import { lastValueFrom } from 'rxjs';
import { CharacterBoxComponent } from '../character-box/character-box.component';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CharacterBoxComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchText1: string = '';
  searchText2: string = '';
  player1: any = null;
  player2: any = null;

  constructor(
    private httpService: HttpService<any>,
    private modalService: ModalService,
    private localStorageService: LocalStorageService
  ) {
    if (localStorage.getItem('player1')) {
      this.player1 = JSON.parse(localStorage.getItem('player1') as string)
    }
    if (localStorage.getItem('player2')) {
      this.player2 = JSON.parse(localStorage.getItem('player2') as string)
    }
  }

  async onSubmit(player: number) {
    let searchText= '';
    if (player === 1) searchText = this.searchText1;
    if (player === 2) searchText = this.searchText2;
    if (searchText.trim() !== '') {
      const searchResult = await lastValueFrom(this.httpService.get('characters', { nameStartsWith: searchText }));
      if (searchResult) {
        if (searchResult.code == 200) {
          console.log(searchResult.data.results)
          this.openModalSelect(searchResult.data.results, player)
        }
      }
    }
  }

  openModalSelect(dados: any, player: number): void {
    let modalWidth = '90vw';
    if (window.innerWidth > 768) modalWidth = '600px';
    const dialogRef = this.modalService.openModal(ModalSelectCharacterComponent, {
      width: modalWidth,
      data: { title: `Selecionar Personagem`, dados: dados }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (player === 1) {
          this.player1 = result
          this.localStorageService.setItem('player1', JSON.stringify(result))
        }
        if (player === 2) {
          this.player2 = result
          this.localStorageService.setItem('player2', JSON.stringify(result))
        }
      };
    });
  }

  clearCharacter(player: number) {
    if (player === 1) {
      this.localStorageService.removeItem('player1')
      this.player1 = null;
    }
    if (player === 2) {
      this.localStorageService.removeItem('player2')
      this.player2 = null;
    }
  }
}
