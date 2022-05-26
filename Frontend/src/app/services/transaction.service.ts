import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  apiUrl = "http://localhost:8000/api";

  constructor(private httpClient:HttpClient) { }

  getTransactions() {
    return this.httpClient.get(`${this.apiUrl}/transactions`);
  }
  getOneTransaction( id:any ) {
    return this.httpClient.get(`${this.apiUrl}/transaction/${id}`);
  }
}
