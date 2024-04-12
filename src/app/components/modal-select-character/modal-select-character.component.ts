import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CharacterBoxComponent } from '../character-box/character-box.component';
import { ICharacter } from '../../interfaces/character.interface';

interface IModalData {
  dados: ICharacter[];
  title: string;
}

@Component({
  selector: 'app-modal-select-character',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    CharacterBoxComponent
  ],
  templateUrl: './modal-select-character.component.html',
  styleUrl: './modal-select-character.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalSelectCharacterComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IModalData,
    public dialogRef: MatDialogRef<ModalSelectCharacterComponent>
  ) {
    console.log(data.dados)
  }

  selectCharacter(character: ICharacter) {
    this.closeModal(character);
  }

  closeModal(data?: ICharacter) {
    this.dialogRef.close(data);
  }

}
