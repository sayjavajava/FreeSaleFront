import { ConfirmDialogService } from './services/confirm-dialog.service';
import { ConfirmationdialogComponent } from './confirmationdialog/confirmationdialog.component';
import { SigninComponent } from './signin/signin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChartsComponent } from './charts/charts.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UpdateRoleComponent } from './update-role/update-role.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
import { TokenInterceptor } from './common/TokenInterceptor';
import { ProductService } from './services/product.service';

import { UploadFileService } from './services/upload-file.service';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';

import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorHandler, NgModule, Component } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import {AppErrorHandler} from './common/AppErrorHandler';

import { Routes, RouterModule } from '@angular/router';
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
import {MatSidenavModule} from '@angular/material/sidenav';	
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

import { CategoryService } from './services/category.service';
import { ShowProductComponent } from './show-product/show-product.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MessageService } from './services/index';
import { HomeComponent } from './home/index';
@NgModule(<NgModule>{
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    NavbarComponent,
    ProductComponent,
    SignupComponent,
    UpdateRoleComponent,
    ShowProductComponent,
    UpdateProductComponent,
    HomeComponent,
    SidebarComponent,
    ChartsComponent,
    ProductPageComponent,
    SigninComponent,
    ConfirmationdialogComponent
    
  ],
 entryComponents: [UpdateRoleComponent,UpdateProductComponent,SigninComponent,ConfirmationdialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCardModule,
    MatSidenavModule,
    FlexLayoutModule,

    Ng2Charts,
    RouterModule.forRoot([
      {path :'',component:ProductPageComponent},
      {path :'user',component:UserComponent},
      {path :'home',component:ProductPageComponent},
      {path :'login',component:LoginComponent},
      {path :'signup',component:SignupComponent},
      {path :'update',component:UpdateRoleComponent},
      {path: 'user/edit/:id', component: SignupComponent},
      {path: 'chart',component:ChartsComponent}, 
      {path: 'sidebar',component:SidebarComponent},
      {path: 'productcatalog',component:ProductPageComponent},
      {
        path :'ShowProducts',
        component:ShowProductComponent,
        canActivate:[AuthGuard,AdminAuthGuard] 
    },
      {path :'productadd',component:ProductComponent},
    ]),
    HttpModule,
    
  ],
  providers: [MessageService,UserService,ConfirmDialogService,
    AuthenticationService,UploadFileService,CategoryService,ProductService,AuthGuard,AdminAuthGuard,
    
    {provide: ErrorHandler, useClass: AppErrorHandler},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
    ],

  bootstrap: [AppComponent],
 
  //bootstrap(HomeComponent, [provide(MessageService, {useValue: new MessageService()})]);
  //bootstrap(TestComponent, [provide(MessageService, {useValue: new MessageService()})]);

})
export class AppModule { }
