import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { CartComponent } from './components/cart/cart.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { ContentComponent } from './components/content/content.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetaillsComponent } from './components/detaills/detaills.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { WebmasterComponent } from './components/webmaster/webmaster.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HasRoleGuard } from './has-role.guard';

export const routes: Routes = [
  {
    path: "admin",
    component: WebmasterComponent,
    canActivate: [HasRoleGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "articles", component: ArticleComponent },
      { path: "categories", component: CategorieComponent },
      { path: "transactions", component: TransactionComponent },
      { path: "customers", component: CustomerComponent }
    ]
  },
  {
    path: "",
    component: WelcomeComponent,
    children: [
      { path: "content", component: ContentComponent },
      { path: "cart", component: CartComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: 'search/:searchTerm', component: WelcomeComponent },
      { path: "cart/:id", component: CartComponent },
      { path: "dettails/:id", component: DetaillsComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
