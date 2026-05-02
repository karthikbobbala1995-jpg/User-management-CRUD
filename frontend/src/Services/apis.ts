import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Apis {

  BASE_URL = "http://localhost:3000"
  private readonly http = inject(HttpClient)

  getAllEmployees(){
    const apiUrl = `${this.BASE_URL}/api/all`;
    return this.http.get(apiUrl)
  }
  saveEmployee(payload:any){
    const apiUrl = `${this.BASE_URL}/api/save`;
    return this.http.post(apiUrl,payload)
  }
  updateEmployee(payload:any){
    const apiUrl = `${this.BASE_URL}/api/update/${payload.id}`;
    return this.http.put(apiUrl,payload)
  }
 deleteEmployee(id: string) {
  return this.http.delete(`${this.BASE_URL}/api/delete/${id}`);
}
}
