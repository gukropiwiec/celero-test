import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/localstorage.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { ModalResultComponent } from '../modal-result/modal-result.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer: string = 'X';
  placar = {
    player1: {
      score: '0',
      name: '',
      thumbnail: ''
    },
    player2: {
      score: '0',
      name: '',
      thumbnail: ''
    },
  }
  localStorageSubscription: Subscription;

  constructor(
    private localStorageService: LocalStorageService,
    private modalService: ModalService,
    private _snackBar: MatSnackBar
  ) {
    this.localStorageSubscription = this.localStorageService.getStorageObservable().subscribe((key: string) => {
      if (key === 'player1') {
        const character = JSON.parse(localStorage.getItem('player1') as string) || null
        this.placar.player1.name = character?.name || ''
        this.placar.player1.thumbnail = `${character?.thumbnail.path}.${character?.thumbnail.extension}`
      }
      if (key === 'player2') {
        const character = JSON.parse(localStorage.getItem('player2') as string) || null
        this.placar.player2.name = JSON.parse(localStorage.getItem('player2') as string)?.name || ''
        this.placar.player2.thumbnail = `${character?.thumbnail.path}.${character?.thumbnail.extension}`
      }
    });
  }

  ngOnInit(): void {
    const character1 = JSON.parse(localStorage.getItem('player1') as string) || null
    this.placar.player1.name = character1?.name || ''
    this.placar.player1.thumbnail = `${character1?.thumbnail.path}.${character1?.thumbnail.extension}`
    const character2 = JSON.parse(localStorage.getItem('player2') as string) || null
    this.placar.player2.name = JSON.parse(localStorage.getItem('player2') as string)?.name || ''
    this.placar.player2.thumbnail = `${character2?.thumbnail.path}.${character2?.thumbnail.extension}`
    this.placar.player1.score = localStorage.getItem('player1-score') || '0'
    this.placar.player2.score = localStorage.getItem('player2-score') || '0'
  }

  fazerJogada(row: number, col: number) {
    if (!localStorage.getItem('player1') || !localStorage.getItem('player2')) {
      this.openSnackBar('Primeiro selecione os dois jogadores para iniciar.')
      return;
    }
    if (!this.board[row][col]) {
      this.board[row][col] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

  }

  checkResultado() {
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] !== '' && this.board[i][0] === this.board[i][1] && this.board[i][0] === this.board[i][2]) {
        if (this.board[i][0] === 'X') {
          this.playerScore(1)
        }
        else if (this.board[i][0] === 'O') {
          this.playerScore(2)
        }
        this.resetBoard();
        return;
      }
    }

    for (let j = 0; j < 3; j++) {
      if (this.board[0][j] !== '' && this.board[0][j] === this.board[1][j] && this.board[0][j] === this.board[2][j]) {
        if (this.board[0][j] === 'X') {
          this.playerScore(1)
        }
        else if (this.board[0][j] === 'O') {
          this.playerScore(2)
        }
        this.resetBoard();
        return;
      }
    }

    if (this.board[0][0] !== '' && this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2]) {
      if (this.board[0][0] === 'X') {
        this.playerScore(1)
      }
      else if (this.board[0][0] === 'O') {
        this.playerScore(2)
      }
      this.resetBoard();
      return;
    }
    if (this.board[0][2] !== '' && this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0]) {
      if (this.board[0][2] === 'X') {
        this.playerScore(1)
      }
      else if (this.board[0][2] === 'O') {
        this.playerScore(2)
      }
      this.resetBoard();
      return;
    }

    if (this.isBoardFull()) {
      this.openModalSelect('velha')
      this.resetBoard();
    }
  }

  private playerScore(player: number) {
    if (player === 1) {
      const score = Number(this.localStorageService.getItem('player1-score')) || 0
      this.placar.player1.score = (score + 1).toString();
      this.localStorageService.setItem('player1-score', this.placar.player1.score.toString())
      this.openModalSelect('player1');
    }
    else if (player === 2) {
      const score = Number(this.localStorageService.getItem('player2-score')) || 0
      this.placar.player2.score = (score + 1).toString();
      this.localStorageService.setItem('player2-score', this.placar.player2.score.toString())
      this.openModalSelect('player2')
    }
  }

  private openModalSelect(result: string): void {
    let modalWidth = '90vw';
    if (window.innerWidth > 768) modalWidth = '600px';
    this.modalService.openModal(ModalResultComponent, {
      width: modalWidth,
      data: { result }, 
    });
  }

  isBoardFull(): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === '') {
          return false;
        }
      }
    }
    return true;
  }

  private resetBoard() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = 'X';
  }

  resetPlacar() {
    this.placar.player1.score = '0'
    this.placar.player2.score = '0'
    this.localStorageService.setItem('player1-score', '0')
    this.localStorageService.setItem('player2-score', '0')
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 5000
    });
  }
}
