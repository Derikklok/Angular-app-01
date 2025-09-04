import { Component, inject, OnInit } from '@angular/core';
import { APIResponse, IEmployee } from '../../model/interface/role';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  employeeList:IEmployee [] = [];
  paginatedEmployeeList:IEmployee [] = [];
  http = inject(HttpClient);

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  pages: number[] = [];

  ngOnInit(): void {
      console.log('Employees rendered')
      this.getAllEmployees();
  }

  getAllEmployees(){
    this.http.get<APIResponse>('/api/ClientStrive/GetAllEmployee').subscribe((res:APIResponse)=>{
      this.employeeList = res.data;
      this.totalItems = this.employeeList.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.updatePagination();
      console.log(this.employeeList);
    })
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEmployeeList = this.employeeList.slice(startIndex, endIndex);
    this.generatePageNumbers();
  }

  generatePageNumbers(): void {
    this.pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updatePagination();
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }
}
