import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  islogin: boolean = this.authService.Sign();
  status: any;

  entredSearchValue: string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.entredSearchValue);
  }

  logout() {
    this.authService.logout().subscribe(reponce => {
      this.islogin = this.authService.loggedIn = false;
      this.status = 0;
      this.islogin = false;
      this.authService.logout();
    })
  }

}
