import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidationService } from '../../services/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;

  constructor(private authService: AuthService,
              private _flashMessagesService: FlashMessagesService,
              private validationService: ValidationService,
              private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }

    //Validate fields
    if(!this.validationService.validateLogin(user)){
      this._flashMessagesService.show("Please fill all fields", { cssClass: 'alert-danger', timeout: 4000 });
      return false;
    } else if (!this.validationService.validateEmail(user.email)) {
      this._flashMessagesService.show("Please type a valid email", { cssClass: 'alert-danger', timeout: 4000 });
      return false;
    }
    
    this.authService.loginUser(user).subscribe(data => {
      if (data.success){
        this.authService.storeToken(data.token, data.user);
        this._flashMessagesService.show("Welcome back, " + data.user.name, { cssClass: 'alert-success', timeout: 4000 });
        this.router.navigate(['/']);
      } else {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 4000 });
      }
    })
  }

}
