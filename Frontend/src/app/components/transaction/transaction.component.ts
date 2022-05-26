import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  imageDirectory = "http://localhost:8000/images/articles/";

  transactions : any;
  transaction: any;
  article_transactions: any;
  articles: any;
  quantite: any;
  oneTransaction: boolean = false;

  constructor(private transactionService:TransactionService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe( reponce => {
      this.transactions = reponce;
      for( let transaction of this.transactions){
        transaction.created_at = new Date( transaction.created_at ).toISOString().slice(0, 16).replace('T', ' ');
      }   
    })
  }
  getOneTransaction( id:any ) {
    this.transactionService.getOneTransaction( id ).subscribe( reponce => {
      this.transaction = reponce;
      this.articles = this.transaction.articles;
      this.article_transactions = this.transaction.article_transactions;
      this.quantite = this.transaction.quantite;
      this.transaction = this.transaction.transaction;
      this.oneTransaction = true
    })
  }
}
