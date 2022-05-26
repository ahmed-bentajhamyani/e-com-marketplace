import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  apiUrl = "http://localhost:8000/api";

  constructor(private httpClient:HttpClient) { }

  getArticles(){
    return this.httpClient.get<Article[]>(`${this.apiUrl}/articles`);
  }
  getOneArticle( id:any ){
    return this.httpClient.get<Article>(`${this.apiUrl}/article/${id}`);
  }
  deleteArticle( id:any ){
    return this.httpClient.delete(`${this.apiUrl}/deletearticle/${id}`);
  }
  persistArticle( data:any ){
    console.log(data);
    return this.httpClient.post(`${this.apiUrl}/addarticle`, data);
  }
  updateArticle( article:any ){
    return this.httpClient.put<Article>(`${this.apiUrl}/updatearticle/${article.id}`, article);
  }
}
