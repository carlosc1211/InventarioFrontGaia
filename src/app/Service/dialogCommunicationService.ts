import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogCommunicationService {
  private dialogClosedSource = new Subject<void>();

  dialogClosed$ = this.dialogClosedSource.asObservable();

  notifyDialogClosed() {
    this.dialogClosedSource.next();
  }
}
