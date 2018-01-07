import { AuthenticationService } from './../services/authentication.service';
import { MessageService } from './../services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { SigninComponent } from './../signin/signin.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private matdialog:MatDialog) { 

  }
  ngOnInit() {
  }

  Login() {
    let dialogRef = this.matdialog.open(SigninComponent, {
      height: '460px',
      width: '500px'
    });      

  }


}
