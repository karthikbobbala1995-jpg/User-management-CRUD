import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apis } from '../../Services/apis';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  imports: [ReactiveFormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add implements OnInit {

  addUserForm!: FormGroup;
  private readonly fb = inject(FormBuilder)
  private api = inject(Apis);
  private dialogRef = inject(MatDialogRef<Add>)
  public data = inject(MAT_DIALOG_DATA)
  headingText = signal('')
  ngOnInit(): void {
    console.log('[data]',this.data)
    this.initialization();
  }
  initialization() {
  const employeeData = this.data?.isEdit;

  if (employeeData) {
    this.headingText.set('Update Employee');

    this.addUserForm = this.fb.group({
      employeeName: [this.data?.data?.employeeName, Validators.required],
      employeeRole: [this.data?.data?.employeeRole, Validators.required],
      employeeGender: [this.data?.data?.employeeGender, Validators.required],
      employeeSalary: [this.data?.data?.employeeSalary, Validators.required],
      employeeDob: [this.data?.data?.employeeDob, Validators.required],
      employeePhno: [this.data?.data?.employeePhno, Validators.required]
    });

  } else {
    this.headingText.set('Add Employee');

    this.addUserForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeRole: ['', Validators.required],
      employeeGender: ['', Validators.required],
      employeeSalary: ['', Validators.required],
      employeeDob: ['', Validators.required],
      employeePhno: ['', Validators.required]
    });
  }
}
  handleAddSubmit(){
    const formValue = this.addUserForm.value;
    if(this.data?.data?._id){
     const payload = {
      id:this.data.data._id,
      ...formValue
     }
     console.log('[update Payload]',payload)
     this.api.updateEmployee(payload).subscribe((res:any)=>{
      this.dialogRef.close(true)
     })
    } else {
 if(this.addUserForm.invalid){
      return
    } else {
      this.api.saveEmployee(formValue).subscribe({
        next:(res:any)=>{
           this.dialogRef.close(true)
        }
      })
    }
    }
   
  }
}
