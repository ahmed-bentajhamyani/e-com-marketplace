import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "http://localhost:8000/api";
  loggedIn: boolean = false;
  // pour recuperer le nom a afficher lors de login
  name!: string;
  public status = 0;
  AllUser: any = [];
  public user_id: any = [];
  reponce: any;
  constructor(private htttpClient: HttpClient) {
  }

  register(data: any) {
    
    this.loggedIn = true;
    this.name = data.name;
    this.user_id = data.id;
    return  this.htttpClient.post(`${this.apiUrl}/register`, data);
  }
  login(data: any) {
    this.loggedIn = true;
    return this.htttpClient.post(`${this.apiUrl}/login`, data);
  }

  logout() {
    this.loggedIn = false;
    this.status = 0;
    return this.htttpClient.get(`${this.apiUrl}/logout`);
  }

  users() {
    return this.htttpClient.get(`${this.apiUrl}/allUsers`);
  }

  Sign() {
    return this.loggedIn;
  }

  reset() {

  }

  getUserName() {
    return this.name;
  }

}
