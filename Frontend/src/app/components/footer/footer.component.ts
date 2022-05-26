import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  categories:any;



  constructor(private categorieService:CategorieService) { }

  ngOnInit(): void {
    this.getCategories(); 
  }

  scroll(id: string){
    let el = document.getElementById(id);
    console.log(id);
    el!.scrollIntoView();
  }
  
  getCategories() {
    this.categorieService.getCategories().subscribe(reponse => {
      this.categories = reponse;
    })
  }
  
  

}
