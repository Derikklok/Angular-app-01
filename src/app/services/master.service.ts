import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/interface/role';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

  getDesignations():Observable<APIResponse>{
    return this.http.get<APIResponse>("/api/ClientStrive/GetAllDesignation")
  }
}
