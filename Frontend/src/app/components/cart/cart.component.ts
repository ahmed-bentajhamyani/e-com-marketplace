import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  imageDirectory = "http://localhost:8000/images/articles/";

  user_id: any;
  public articles_in_carts: Article[] = [];
  qte: number = 1;
  article: any;
  msg: any;
  article_paniers: any;
  temp: any = [];
  ttee: any = [];
  help: any;
  articles: any;
  TTC: any;
  total: any;
  constructor(public authService: AuthService, private cartService: CartService, private route: ActivatedRoute, private router: Router, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getArticles();
    if (this.authService.loggedIn)
      this.user_id = this.authService.user_id;
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.find_article_by_id(+params['id']);
      }
    })
    this.getCarts(this.user_id); // mise a jour de tableau de carts
    this.getPrixItems();
  }
  getCarts(user_id: any) {
    this.cartService.getCarts(user_id).subscribe(carts => {
      this.temp = carts;
      this.article_paniers = this.temp.article_paniers;
      this.cartService.lenghCart = 0
      for (let article_panier of this.article_paniers) {
        this.cartService.lenghCart += article_panier.quantite;
        for (let article of this.articles) {
          if (article_panier.article_id == article.id) {
            this.articles_in_carts.push(this.article);
          }
        }
      }
    })
  }

  getArticles() {
    this.articleService.getArticles().subscribe(article => {
      this.articles = article;
    })
  }

  // get one article
  find_article_by_id(id:any) {
    this.articleService.getOneArticle(id).subscribe(reponse => {
      this.article = reponse;
      this.article = this.article.article;
      this.articles_in_carts.push(this.article);
      this.addToCart();
    })
  }

  // add to cart
  addToCart() {
    this.cartService.addToCart(this.user_id, this.article.id).subscribe(msg => {
      this.msg = msg;
      this.cartService.lenghCart++;
    })
    this.getPrixItems();
    this.router.navigate(['/cart']);
  }
  deleteFromCart(idArt: any) {
    this.cartService.deleteFromCart(this.user_id, idArt).subscribe(msg => {
      this.msg = msg;
      this.getCarts(this.user_id)
    })
    this.getPrixItems()
  }
  vider() {
    this.cartService.deleteAll(this.user_id).subscribe(reponce => {
      this.cartService.lenghCart = 0;
      this.getArticles();
      this.getCarts(this.user_id);
      this.router.navigate(['/cart']);
    })
  }

  confirmer() {
    this.cartService.confirmerPanier(this.user_id).subscribe(msg => {
      this.msg = msg;
      this.TTC = 0;
      this.total = 0;
      this.articles_in_carts.length = 0;
      this.vider();
    });
  }

  getPrixItems() {
    this.cartService.getPrixItems(this.user_id).subscribe(ttc => {
      this.TTC = ttc;
      this.TTC = this.TTC.ttc;
      this.getTotal();
    })
  }

  getTotal() {
    this.total = Number(this.TTC) + 8.50;
  }

  deleteOne(article_panier: any) {
    this.deleteFromCart(article_panier.article_id);
    this.getArticles();
    this.getCarts(this.user_id);
    this.getPrixItems();
  }
  addOne(article_panier: any) {
    this.cartService.addToCart(this.user_id, article_panier.article_id).subscribe(msg => {
      this.msg = msg;
    });
    this.getArticles();
    this.getCarts(this.user_id);
    this.getPrixItems();
  }
}


