import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  constructor(private dialog: MatDialog) {}

  openModal(component: any, options?: any): MatDialogRef<any> {
    return this.dialog.open(component, options);
  }
}