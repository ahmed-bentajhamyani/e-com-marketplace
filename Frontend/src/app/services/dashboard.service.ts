import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl = "http://localhost:8000/api";

  constructor(private httpClient:HttpClient) { }

  customers(){
    return this.httpClient.get(`${this.apiUrl}/customersnumber`);
  }
  orders(){
    return this.httpClient.get(`${this.apiUrl}/orders`);
  }
  topSellingProducts() {
    return this.httpClient.get(`${this.apiUrl}/topsellingproducts`);
  }
  topSellingCategories() {
    return this.httpClient.get(`${this.apiUrl}/topsellingcategories`);
  }
  newCustomers() {
    return this.httpClient.get(`${this.apiUrl}/newcustomers`);
  }
}
