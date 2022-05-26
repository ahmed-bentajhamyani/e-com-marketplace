import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
  data: any;
  isadmin: boolean = false;
  static islogin: boolean = false;
  messageError: any;
  constructor(public authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }
  register() {
    this.authService.register(this.User).subscribe((reponce: any) => {
      RegisterComponent.islogin = true;
      this.data = reponce;
      this.authService.user_id = this.data.user.id;
      this.authService.status = 1;
      this.route.navigate(['/content']);
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
