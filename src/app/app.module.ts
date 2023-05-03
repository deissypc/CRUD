import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Importar componentes
//boton
import {MatButtonModule} from '@angular/material/button';
//Tabla
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
//Formulario
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

//modificar formato de fechas
import {MomentDateModule} from '@angular/material-moment-adapter';

//alertas
import {MatSnackBarModule} from '@angular/material/snack-bar';

//iconos
import {MatIconModule} from '@angular/material/icon';

//modales
import {MatDialogModule} from '@angular/material/dialog';

//peticion
import {HttpClientModule} from '@angular/common/http';

//formulario reactivo
import {ReactiveFormsModule} from '@angular/forms';
import { DialogAddEditComponent } from './Modal/dialog-add-edit/dialog-add-edit.component';
import { DialogoDeleteComponent } from './Modal/dialogo-delete/dialogo-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogAddEditComponent,
    DialogoDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
