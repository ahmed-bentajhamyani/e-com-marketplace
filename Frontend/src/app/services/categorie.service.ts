import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  apiUrl = "http://localhost:8000/api";

  constructor(private httpClient:HttpClient) { }

  getCategories(){
    return this.httpClient.get<Categorie[]>(`${this.apiUrl}/categories`);
  }
  deleteCategorie( id:any ){
    return this.httpClient.delete(`${this.apiUrl}/deletecategorie/${id}`);
  }
  persistCategorie( data:any ){
    return this.httpClient.post<Categorie>(`${this.apiUrl}/addcategorie`, data);
  }
  updateCategorie( categorie:any ){
    return this.httpClient.put<Categorie>(`${this.apiUrl}/updatecategorie/${categorie.id}`, categorie);
  }
}
