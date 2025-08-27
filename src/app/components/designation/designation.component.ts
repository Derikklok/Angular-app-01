import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponse, IDesignation } from '../../model/interface/role';

@Component({
  selector: 'app-designation',
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css',
})
export class DesignationComponent implements OnInit {

  designationList : IDesignation[] = [];
  masterService = inject(MasterService);
  ngOnInit(): void {
    this.masterService.getDesignations().subscribe((result:APIResponse)=>{
      this.designationList = result.data;
    },error=>{
      alert("Api error in designation component");
    })
  }
}
