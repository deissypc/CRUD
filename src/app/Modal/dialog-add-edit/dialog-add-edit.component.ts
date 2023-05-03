import { Component, OnInit, Inject} from '@angular/core';

import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';


//Alertas
import { MatSnackBar } from '@angular/material/snack-bar';

//formato fechas
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

//Interfaces
import { ISupplier } from 'src/app/Interfaces/isupplier';
import { IInfo } from 'src/app/Interfaces/iinfo';

//Servicios
import { SupplierService } from 'src/app/Services/supplier.service';
import { InfoService } from 'src/app/Services/info.service';



//configurar formato de fechas
export const MY_DATE_FORMATS = {
  parse:{
    dateInput:'DD/MM/YYYY',
  },
  display:{
    dateInput:'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel:'MMMM YYYY'
  }
}

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers: [
    {provide : MAT_DATE_FORMATS, useValue : MY_DATE_FORMATS}
  ]
})
export class DialogAddEditComponent implements OnInit {

  formInfo: FormGroup;
  tituloAccion: string = "Nueva Factura";
  botonAccion: string ="Registrar";
  listaSupplier: ISupplier[] = [];

  constructor(
    private dialogReferencia : MatDialogRef<DialogAddEditComponent>,
    private fb:FormBuilder,
    private _snackBar:MatSnackBar,
    private _SupplierServicio:SupplierService,
    private _InfoServicio:InfoService,
    @Inject(MAT_DIALOG_DATA) public dataInfo:IInfo
  ){

    this.formInfo = this.fb.group({
      numberFact: ['',Validators.required],
      fecha : ['',Validators.required],
      city : ['',Validators.required],
      clienName : ['',Validators.required],
      plateVeh : ['',Validators.required],
      brand :  ['',Validators.required],
      activityName : ['',Validators.required],
      number : ['',Validators.required],
      valor :  ['',Validators.required],
      total :  ['',Validators.required],
      supplierId : ['',Validators.required],
    })

    this._SupplierServicio.getList().subscribe({
      next:(data)=>{
        this.listaSupplier = data;
      },error:(e)=>{}
    })
  }

  //devolver alerta 
  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 4000
    });
  }

  addEditInfo(){

    console.log (this.formInfo.value)

    const mod : IInfo = {
    infoId : 0,
    numberFact: this.formInfo.value.numberFact,
    fecha: moment(this.formInfo.value.fecha).format("DD/MM/YYYY"),
    city: this.formInfo.value.city,
    clienName: this.formInfo.value.clienName,
    plateVeh: this.formInfo.value.plateVeh,
    brand: this.formInfo.value.brand,
    activityName: this.formInfo.value.activityName,
    number:this.formInfo.value.number,
    valor: this.formInfo.value.valor,
    total: this.formInfo.value.total,
    supplierIdFk: this.formInfo.value.supplierIdFk
    }

    if(this.dataInfo == null){ 
      console.log(mod);
      this._InfoServicio.Add(mod).subscribe({
        next:(data)=>{
          this.mostrarAlerta("Factura creada","Listo");
          this.dialogReferencia.close("creado");
        },error:(e)=>{
          this.mostrarAlerta("No se pudo crear","Error");
        }
      })
    }else{
      this._InfoServicio.Update(this.dataInfo.infoId,mod).subscribe({
        next:(data)=>{
          this.mostrarAlerta("Factura editada","Listo");
          this.dialogReferencia.close("editado");
        },error:(e)=>{
          this.mostrarAlerta("No se pudo editar","Error");
        }
      })
    }

    
  }

  ngOnInit(): void {

    if(this.dataInfo){
      this.formInfo.patchValue({
    numberFact: this.dataInfo.numberFact,
    fecha: moment(this.dataInfo.fecha,"DD/MM/YYYY"),
    city: this.dataInfo.city,
    clienName: this.dataInfo.clienName,
    plateVeh: this.dataInfo.plateVeh,
    brand: this.dataInfo.brand,
    activityName: this.dataInfo.activityName,
    number:this.dataInfo.number,
    valor: this.dataInfo.valor,
    total: this.dataInfo.total,
    supplierIdFk: this.dataInfo.supplierIdFk
      })
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
  }
}
