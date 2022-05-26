import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CategorieService } from 'src/app/services/categorie.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  islogin: boolean = this.authService.Sign();
  status: any;
  searchTerm: any = "";
  categories: any;
  constructor(public authService: AuthService, private route: ActivatedRoute, private router: Router, public cartService: CartService, private categorieService: CategorieService) { }


  ngOnInit(): void {
    this.getCategories()
    this.route.params.subscribe(params => {
      if (params['searchTerm'])
        this.searchTerm = params['searchTerm'];
    })
  }

  logout() {
    this.cartService.lenghCart = 0;
    this.authService.logout().subscribe(reponce => {
      this.islogin = this.authService.loggedIn = false;
      this.status = 0;
      this.islogin = false;

    })
  }

  scroll(id: any) {
    let el = document.getElementById(id);
    console.log(id);
    el!.scrollIntoView();
  }

  seartch(id: string): void {
    console.log("test seartch is  : " + this.searchTerm)
    if (this.searchTerm)
      this.router.navigateByUrl('content/search/' + this.searchTerm);
    this.scroll(id);
  }


  getCategories() {
    this.categorieService.getCategories().subscribe(reponse => {
      this.categories = reponse;
      console.log("categories sont  : ")
      console.log(this.categories)
    })
  }

}
