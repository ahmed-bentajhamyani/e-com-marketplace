import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  imageDirectory = "http://localhost:8000/images/articles/";

  articles: Article[] = [];
  what_we_seartc: Article[] = [];
  categories: any;
  emp: any;
  last_article: Article[] = [];
  searchTerm: any;
  constructor(private articleService: ArticleService, private categorieService: CategorieService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getArticles();
    this.getCategories();
    //   search  
    this.emp = this.route.params.subscribe(params => {
      if (params['searchTerm']) {
        this.searchTerm = params;
        this.what_we_seartc = this.articles.filter(article => article.nomArticle.toLowerCase().includes(params['searchTerm'].toLowerCase()));
        console.log("what we sear before : ")
        console.log(this.what_we_seartc);
        if (this.what_we_seartc.length == 0) {
          this.getArticles()
          console.log("what we no result : ")
          console.log(this.what_we_seartc);
        }
      }
      else {
        this.getArticles()
        console.log("on a pas chercher ")
        console.log(this.what_we_seartc)

      }
    })
  }

  getArticles() {
    this.articleService.getArticles().subscribe(reponse => {
      this.articles = reponse;
      this.what_we_seartc = this.articles;
      this.last_article[0] = reponse[reponse.length - 3]
      this.last_article[1] = reponse[reponse.length - 2]
      this.last_article[2] = reponse[reponse.length - 1]
    })
  }
  getCategories() {
    this.categorieService.getCategories().subscribe(reponse => {
      this.categories = reponse;
    })
  }
  scroll(id: any){
    let el = document.getElementById(id);
    console.log(id);
    el!.scrollIntoView();
  }
}
