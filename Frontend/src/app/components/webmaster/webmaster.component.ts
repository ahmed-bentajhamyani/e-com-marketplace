import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-webmaster',
  templateUrl: './webmaster.component.html',
  styleUrls: ['./webmaster.component.css']
})
export class WebmasterComponent implements OnInit {

  searchText: any;

  searchBar = false;

  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.showDashboard();
  }
  showDashboard() {
    this.router.navigate(['dashboard'], {relativeTo: this.route });
  }

  onSearchTextEntered(searchValue:string) {
    this.searchBar = true;
    this.searchText = searchValue;
    // console.log(this.searchText)
  }

  noSearchBar() {
    this.searchBar = false;
  }
}
