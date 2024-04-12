import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CharacterBoxComponent } from '../character-box/character-box.component';

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
  result: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalResultComponent>
  ) {
    console.log(data.result)
    if (data.result === 'player1') {
      this.result = JSON.parse(localStorage.getItem('player1') as string);
    }
    else if (data.result === 'player2') {
      this.result = JSON.parse(localStorage.getItem('player2') as string);
    }
    else if (data.result === 'velha') {
      this.result = "Velha!"
    }
  }

  closeModal(data?: any) {
    this.dialogRef.close(data);
  }
}
