import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "http://localhost:8000/api";

  constructor(private httpClient:HttpClient) { }

  getCustomers() {
    return this.httpClient.get(`${this.apiUrl}/customers`);
  }
}
