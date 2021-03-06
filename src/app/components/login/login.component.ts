import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RestService} from '../../services/rest.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userEmail: string;
  userPw: string;

  hide = true;
  restService = null;
  constructor(private router: Router, private rest: RestService, private snackBar: MatSnackBar) {
    this.restService = rest;
  }

  ngOnInit() {
  }

  login() {
    let user = null;
    this.restService.getUser(this.userEmail, this.userPw).toPromise().then(res => {
      user = res.data[0] ? res.data[0] : null;
      if (user && user.email === this.userEmail && user.password === this.userPw) {
        this.router.navigate(['overview'], {queryParams: {id: user._id}});
      } else {
        this.snackBar.open('Invalid login', null, {duration: 2000});
      }
    });
  }
}
