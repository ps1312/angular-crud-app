import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  username: String;
  password: String;

  constructor(private validateService: ValidationService,
              private _flashMessagesService: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    //Validate fields
    if(!this.validateService.validateRegister(user)){
      this._flashMessagesService.show("Please fill all fields", { cssClass: 'alert-danger', timeout: 4000 });
      return false
    } else if(!this.validateService.validateEmail(user.email)){
      this._flashMessagesService.show("Please use a valid email", { cssClass: 'alert-danger', timeout: 4000 });
      return false
    }

    //Make post request to register user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show("You're registered, please login" + user.name, { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/']);
      } else {
        this._flashMessagesService.show(data.err.message, { cssClass: 'alert-danger', timeout: 4000 });
      }
    })
  }

}
