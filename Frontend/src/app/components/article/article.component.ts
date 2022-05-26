import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  apiUrl = "http://localhost:8000/api";
  imageDirectory = "http://localhost:8000/images/articles/";

  articles: any;
  categories: any;

  article: any;
  categorie: any;

  showForm = false;
  editForm = false;
  oneArticle = false;

  Article: Article = {
    nomArticle: '',
    description: '',
    image: '',
    prixUnitaire: 0,
    qteStock: 0,
    user_id: 1,
    categorie_id: 0
  }
  selectedFile: any;

  @Input()
  searchText: string = '';

  constructor(private articleService: ArticleService, private categorieService: CategorieService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getArticles();
    this.getCategories();
  }
  getArticles() {
    this.articleService.getArticles().subscribe(reponse => {
      this.articles = reponse;
      for (let article of this.articles) {
        article.created_at = new Date(article.created_at).toISOString().slice(0, 16).replace('T', ' ');
      }
    })
  }
  getOneArticle(id: any) {
    this.articleService.getOneArticle(id).subscribe(reponse => {
      this.article = reponse;
      this.article = this.article.article;
      this.article.created_at = new Date(this.article.created_at).toISOString().slice(0, 16).replace('T', ' ');

      this.categorie = reponse;
      this.categorie = this.categorie.categorie;
    })
  }
  deleteArticle(id: any) {
    this.articleService.deleteArticle(id).subscribe(reponse => {
      this.getArticles();
    })
  }
  getCategories() {
    this.categorieService.getCategories().subscribe(reponse => {
      this.categories = reponse;
    })
  }
  persistArticle() {
    this.Article.image = this.selectedFile.name;

    let formData: FormData = new FormData();
    formData.append("image", this.selectedFile, this.selectedFile.name);
    this.httpClient.post(`${this.apiUrl}/saveimage`, formData).subscribe(reponce => { });


    this.articleService.persistArticle(this.Article).subscribe((article) => {
      this.articles = [article, ...this.articles];
      this.resetArticle();
    })
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  resetArticle() {
    this.Article = {
      nomArticle: '',
      description: '',
      image: '',
      prixUnitaire: 0,
      qteStock: 0,
      user_id: 1,
      categorie_id: 0
    }
    this.showForm = false;
  }
  editArticle(article: Article) {
    this.Article = article;
    this.editForm = true;
  }
  updateArticle() {
    this.Article.image = this.selectedFile.name;

    console.log(this.Article);
    let formData: FormData = new FormData();
    formData.append("image", this.selectedFile, this.selectedFile.name);
    console.log(formData);
    this.httpClient.post(`${this.apiUrl}/saveimage`, formData).subscribe(reponce => { });

    this.articleService.updateArticle(this.Article).subscribe((article) => {
      this.resetArticle();
      this.editForm = false;
    })
  }
}
