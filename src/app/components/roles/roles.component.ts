import { HttpClient } from '@angular/common/http';
import { Component , inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRole } from '../../model/interface/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  imports: [FormsModule,CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit {
  
  roleList:IRole [] = [];
  http = inject(HttpClient);
  
  
  ngOnInit(): void {
      console.log('roles rendred');
      this.getAllRoles(); 
  }
  
  
  getAllRoles(){
    this.http.get('/api/ClientStrive/GetAllRoles').subscribe((res:any) =>{
      this.roleList = res.data;
    });
  }
  
  
}
