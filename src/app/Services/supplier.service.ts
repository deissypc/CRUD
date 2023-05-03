import { Injectable } from '@angular/core';

import{HttpClient} from"@angular/common/http";
import{environment} from"src/environments/environment";
import{Observable} from"rxjs";
import{ISupplier} from"../Interfaces/isupplier";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint + "supplier/";

  constructor(private http:HttpClient) { }

  getList():Observable<ISupplier[]>{
    return this.http.get<ISupplier[]>(`${this.apiUrl}listar`);
  }
}
