import { ProductService } from './services/product.service';
import { CategoryComponent } from './category/category.component';
 import { UploadFileService } from './services/upload-file.service';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorHandler, NgModule, Component } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import {AppErrorHandler} from './common/AppErrorHandler';
import {TokenInterceptor} from './common/TokenInterceptor';

import { Routes, RouterModule } from '@angular/router';
import {FlexLayoutModule} from "@angular/flex-layout";

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryService } from './services/category.service';


@NgModule(<NgModule>{
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    NavbarComponent,
    ProductComponent,
    CategoryComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatInputModule,
    MatSnackBarModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      {path :'',component:LoginComponent},
      {path :'user',component:UserComponent},
      {path :'home',component:LoginComponent},
      {path :'login',component:LoginComponent},
      {path :'productadd',component:ProductComponent},
    ]),
    HttpModule,
    
  ],
  providers: [UserService,AuthenticationService,UploadFileService,CategoryService,ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
