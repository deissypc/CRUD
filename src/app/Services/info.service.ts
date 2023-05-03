import { Injectable } from '@angular/core';

import{HttpClient} from"@angular/common/http";
import{environment} from"src/environments/environment";
import{Observable} from"rxjs";
import{IInfo} from"../Interfaces/iinfo";


@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint + "info/";

  constructor(private http:HttpClient) { }

  GetList():Observable<IInfo[]>{
    return this.http.get<IInfo[]>(`${this.apiUrl}listar`);
  }

  Add(mod:IInfo):Observable<IInfo>{
    return this.http.post<IInfo>(`${this.apiUrl}registrar`,mod);
  }

  Update(infoId:number,mod:IInfo):Observable<IInfo>{
    return this.http.put<IInfo>(`${this.apiUrl}actualizar/${infoId}`,mod);
  }

  Delete(infoId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}eliminar/${infoId}`);
  }


}
