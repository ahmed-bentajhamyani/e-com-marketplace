import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = "http://localhost:8000/api";
  temp1: any;
  temp2: any;
  hp: any;
  lenghCart = 0
  constructor(private http: HttpClient) { }

  getCarts(id: any) {
    this.hp = id
    return this.http.get(`${this.apiUrl}/panier/${this.hp}`);
  }

  addToCart(user_id: any, article_id: any) {
    this.temp1 = user_id;
    this.temp2 = article_id
    console.log("id1,id2" + this.temp1 + " , " + this.temp2)
    return this.http.get(`${this.apiUrl}/addtopanier/${this.temp1}/${this.temp2}`);
  }

  deleteFromCart(user_id: any, article_id: any) {
    this.temp1 = user_id;
    this.temp2 = article_id
    return this.http.delete(`${this.apiUrl}/deletefrompanier/${this.temp1}/${this.temp2}`);
  }
  deleteAll(user_id: any) {
    return this.http.delete(`${this.apiUrl}/deleteall/${user_id}`);
  }
  confirmerPanier(user_id: any) {
    return this.http.get(`${this.apiUrl}/confirmer/${user_id}`);
  }

  getPrixItems(user_id: any) {
    this.temp1 = user_id;
    return this.http.get(`${this.apiUrl}/getttc/${this.temp1}`);
  }
}
