import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  imageDirectory = "http://localhost:8000/images/articles/";

  customersNumber: any;
  order: any;
  ordersNumber: any;
  salesNumber: any;
  chiffre: any;
  articles: any;
  categories: any;
  newcustomers: any;

  constructor(private dashboardService:DashboardService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.customers();
    this.orders();
    this.topSellingProducts();
    this.topSellingCategories();
    this.newCustomers();
  }
  customers() {
    this.dashboardService.customers().subscribe( (reponce) => {
      this.customersNumber = reponce;
    })
  }
  orders() {
    this.dashboardService.orders().subscribe( (reponce) => {
      this.order = reponce;
      this.ordersNumber = this.order.orders;
      this.salesNumber = this.order.sales;
      this.chiffre = this.order.revenue;
    })
  }
  topSellingProducts() {
    this.dashboardService.topSellingProducts().subscribe( (reponce) => {
      this.articles = reponce;
    })
  }
  topSellingCategories() {
    this.dashboardService.topSellingCategories().subscribe( (reponce) => {
      this.categories = reponce;
    })
  }
  newCustomers() {
    this.dashboardService.newCustomers().subscribe( (reponce) => {
      this.newcustomers = reponce;
    })
  }
  showArticles() {
    this.router.navigate(['admin/articles'], {relativeTo: undefined });
  }
  showCategories() {
    this.router.navigate(['admin/categories'], {relativeTo: undefined });
  }
  showCustomers() {
    this.router.navigate(['admin/customers'], {relativeTo: undefined });
  }
}
