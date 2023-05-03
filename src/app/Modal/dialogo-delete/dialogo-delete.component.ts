import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IInfo } from 'src/app/Interfaces/iinfo';

@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css']
})
export class DialogoDeleteComponent {
  constructor(
    private dialogReferencia : MatDialogRef<DialogoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInfo:IInfo
  ){}

  ConfirmEliminar(){
    if(this.dataInfo){
      this.dialogReferencia.close("eliminar")
    }
  }
}
