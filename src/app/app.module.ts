import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component'; 
import { HeaderComponent } from './header/header.component';
import { MapsComponent } from './maps/maps.component';

import { AuthService } from './services/auth.service';
import { MapsService } from './services/maps.service';
import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'maps', canActivate: [AuthGuardService], component: MapsComponent },
  { path: '', redirectTo: 'maps', pathMatch: 'full' },
  { path: '**', redirectTo: 'maps' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    BookListComponent,
    BookFormComponent,
    HeaderComponent,
    SigninComponent,
    SingleBookComponent,
    MapsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, MapsService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
