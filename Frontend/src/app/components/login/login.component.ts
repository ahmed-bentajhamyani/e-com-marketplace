import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  User: User = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    telephone: '',
    pays: '',
    ville: '',
    adresse: ''
  }
  loginForm = true;
  data: any;
  isadmin: boolean = false;
  messageError: any;

  static login_name: string
  status!: any;
  constructor(public authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.User).subscribe((reponse: any) => {
      this.authService.loggedIn = true;
      this.data = reponse;
      this.authService.user_id = this.data.user.id;
      if (this.data.status == 1)
        this.authService.name = this.data.user.name;
      this.reset();

      
      this.status = this.data.status;
      this.authService.status = this.status;

      if (this.data.status == 1)
        this.User = this.data.user;

      if (this.User.email == "admin@exemple.com")
        this.router.navigate(['/admin']);
      else if (this.data.status == 1) {
        this.router.navigate(['/content']);
      }

    })
  }

  reset() {
    this.User = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      telephone: '',
      pays: '',
      ville: '',
      adresse: ''
    }
  }

}

