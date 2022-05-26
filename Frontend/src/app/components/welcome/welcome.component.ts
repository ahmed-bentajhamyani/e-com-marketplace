import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  articles: Article[] = [];
  what_we_seartc: Article[] = [];
  categories: any;
  emp: any;
  last_article: Article[] = [];
  searchTerm: any;
  constructor(private articleService: ArticleService, private categorieService: CategorieService, private route: ActivatedRoute, private router:Router) { }


  ngOnInit(): void {
    this.getArticles();
    this.getCategories();
    this.showProducts();
    
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

  showProducts() {
    this.router.navigate(['content'], {relativeTo: this.route });
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


}
