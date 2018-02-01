import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';

import { AuthGuardService } from './services/auth-guard.service';
import { ValidationService } from './services/validation.service';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { EditComponent } from './components/post/edit/edit.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register', 
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'posts',
    component: PostComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'posts/edit/:id',
    component: EditComponent,
    canActivate: [AuthGuardService]
  }
];  

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    PostComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidationService, AuthService, AuthGuardService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
