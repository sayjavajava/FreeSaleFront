import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    rForm :FormGroup;
    name:String;
    description :String;
    titlealert:'you must provide name between 4 and 20 char';
    saveSuccess :  boolean ;
    model: any = {};
   // loading = false;
    error = '';

    username:string;
    password:string;
    invalid:boolean;
  constructor(
    private fb : FormBuilder,  
    private router ?: Router,
      private authenticationService ?: AuthenticationService,
      
//      private heroservice?:HeroService 
    ) { 
        this.rForm =fb.group({
            'name': [null,Validators.compose([Validators.required,Validators.maxLength(20),Validators.minLength(4)])],
            'description':[null,Validators.required]
        })
    }
  ngOnInit() {
      // reset login status
  //    this.authenticationService.logout();
 
}
logout(){
  this.authenticationService.logout();
  console.log("i am clled in logout");
}

  login(post) {
     // this.loading = true;
     this.username=post.name;
     this.password=post.description;
     console.log("calledddd"+this.password+this.username);
     this.authenticationService.login(this.username,this.password)
         .subscribe(result => {
              if (result === true) {
                  //  login successful
                  this.router.navigate(['user']);}
        //        else {
        //           // login failed
        //           this.error = 'Username or password is incorrect';
        //  //         this.loading = false;
        //       }

          }, error => {
     //       this.loading = false;
            this.error = error;
          //console.log('uanthorizedd'+ error.json());
           this.invalid=true;  
        });
  }


}
