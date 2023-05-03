import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


import { IInfo } from './Interfaces/iinfo';
import { InfoService } from './Services/info.service';

import { MatSnackBar } from '@angular/material/snack-bar';

//Modal
import {MatDialog} from '@angular/material/dialog';
import { DialogAddEditComponent } from './Modal/dialog-add-edit/dialog-add-edit.component';
import { DialogoDeleteComponent } from './Modal/dialogo-delete/dialogo-delete.component'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['NumberFact', 'Fecha', 'City', 'ClienName', 'PlateVeh', 'Brand', 'ActivityName', 'Number', 'Valor', 'Total', 'Acciones'];
  dataSource = new MatTableDataSource<IInfo>();

  constructor(
    private _infoServicio: InfoService, public dialog: MatDialog,
    private _snackBar : MatSnackBar){
  }

  ngOnInit(): void {
      this.mostrarInfo();
  }

 @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarInfo(){
    this._infoServicio.GetList().subscribe({
      next:(dataResponse)=>{
        console.log(dataResponse)
        this.dataSource.data = dataResponse;
      },error:(e)=>{}
    })
  }

  modalNuevaFactura() {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width: "350px"
    }).afterClosed().subscribe(resultado => {
      if(resultado=="creado"){
        this.mostrarInfo();
      }
    })
    
  }

  
  modalEditarFactura(dataInfo:IInfo) {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width: "350px",
      data:dataInfo
    }).afterClosed().subscribe(resultado => {
      if(resultado=="editado"){
        this.mostrarInfo();
      }
    })
    
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 4000
    });
  }

  dialogoEliminarFactura(dataInfo:IInfo){
    this.dialog.open(DialogoDeleteComponent,{
      disableClose:true,
      data:dataInfo
    }).afterClosed().subscribe(resultado => {
      if(resultado=="eliminar"){
        this._infoServicio.Delete(dataInfo.infoId).subscribe({
          next:(data)=>{
            this.mostrarAlerta("factura eliminada","Listo");
            this.mostrarInfo();
          },
          error:(e)=>{console.log(e)}
        })
      }
    })
  }

  
}