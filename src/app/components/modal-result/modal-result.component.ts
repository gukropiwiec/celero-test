import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CharacterBoxComponent } from '../character-box/character-box.component';
import { ICharacter } from '../../interfaces/character.interface';

interface IModalData {
  result: string;
}

@Component({
  selector: 'app-modal-result',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CharacterBoxComponent
  ],
  templateUrl: './modal-result.component.html',
  styleUrl: './modal-result.component.scss'
})
export class ModalResultComponent {
  result!: ICharacter;
  resultVelha!: string

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IModalData,
    public dialogRef: MatDialogRef<ModalResultComponent>
  ) {
    if (data.result === 'player1') {
      this.result = JSON.parse(localStorage.getItem('player1') as string);
    }
    else if (data.result === 'player2') {
      this.result = JSON.parse(localStorage.getItem('player2') as string);
    }
    else if (data.result === 'velha') {
      this.resultVelha = "Velha!"
    }
  }

  closeModal(data?: string) {
    this.dialogRef.close(data);
  }
}
