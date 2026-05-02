import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Apis } from '../../Services/apis';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Add } from '../add/add';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule}  from '@angular/material/icon'
@Component({
  selector: 'app-dashboard',
  imports: [MatSlideToggle,MatTableModule,MatButtonModule,MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit {
    displayedColumns: string[] = [
    'employeeName',
    'employeeRole',
    'employeeGender',
    'employeeSalary',
    'employeeDob',
    'employeePhno',
    'action'
  ];
  employees = signal<any[]>([]);
   dataSource = new MatTableDataSource<any[]>([])
  private readonly apiService = inject(Apis);
  private readonly router = inject(Router);
  private dialog = inject(MatDialog)
  constructor(){
    effect(()=>{
      this.dataSource.data = this.employees();
    })
  }

  ngOnInit(): void {
    this.getAllEmployess();
  }
  getAllEmployess(){
   this.apiService.getAllEmployees().subscribe({
    next:(response:any)=>{
      if(response && response.success){
         if(response.data.length > 0) {
          const employeeData = response?.data;
          this.employees.set(employeeData)
         }
      }
    },
    error(err) {
      console.log(err)
    },
    complete() {
      console.log('api call completed')
    },
   })
  }
  handleAddNavigation(){
    const dialogRef = this.dialog.open(Add,{
      width:'500px',
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.getAllEmployess();
      }
    })
  }
  handleEdit(element:any){
    const data = element;
    const dialogRef = this.dialog.open(Add,{
      width:'500px',
      data: {
        data,
        isEdit : true
      }
    }) ;
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.getAllEmployess();
      }
    })
  }
  handleDelete(element:any){
     const data = element;
    this.apiService.deleteEmployee(data._id).subscribe((res)=>{
      if(res){
        console.log(res)
        this.getAllEmployess();
      }
    })
  }
}
