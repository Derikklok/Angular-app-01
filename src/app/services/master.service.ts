import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/interface/role';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

  getDesignations():Observable<APIResponse>{
    return this.http.get<APIResponse>(`${environment.apiBaseUrl}/ClientStrive/GetAllDesignation`)
  }
}
