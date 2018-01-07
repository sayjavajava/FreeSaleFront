
import { Observable } from 'rxjs/Observable';
import { Authority } from './../common/Authority';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../services/message.service';
import 'rxjs/add/operator/take'; 


@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {

  }
 
  message:string;
    rForm :FormGroup;
    name:String;
    description :String;
    titlealert:'you must provide name between 4 and 20 char';
    saveSuccess :  boolean ;
    model: any = {};
    value:any=[];
    testadmin:boolean;
   // loading = false;
   currentuser$;
   error = '';

    username:string;
    password:string;
    invalid:boolean;
    constructor(
    private fb : FormBuilder,  
    private authenticationService : AuthenticationService,
    private router ?: Router,
    private route ?:ActivatedRoute,
    private messageservice ?:MessageService
//      private heroservice?:HeroService 
    ) { 
        this.rForm =fb.group({
            'name': [null,Validators.compose([Validators.required,Validators.maxLength(20),Validators.minLength(4)])],
            'description':[null,Validators.required]
        })
        
        // subscribe to home component messages
      }
  ngOnInit() {
//    this.messageservice.currentMessage.subscribe(message => this.message = message)
      // reset login status
     // this.authenticationService.logout();
    // this.isAdmin();
  //  this.currentuser$ = this.authenticationService.currentUser();
   //  this.authenticationService.currentUser().subscribe(res =>this.value=res);
   //  this.authenticationService.isAdmin().subscribe(res =>this.testadmin=res);   
         }

logout(){
  this.authenticationService.logout();
  this.value.splice(0,2);
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
                  let returnurl =this.route.snapshot.queryParamMap.get('returnUrl');
                  console.log('urlstr:'+ returnurl);
                  this.router.navigate([returnurl || 'user'] );}
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

isAuthenticated():boolean{
  return this.authenticationService.isLoggedIn();
}

isAdmin(){
  return this.authenticationService.isAdmin().subscribe(res=>this.testadmin=res);
//    console.log(res),error =>console.log(error));
}
  //testing message
//   sendMessage(): void {
//     // send message to subscribers via observable subject
//     console.log("send");
//   //  this.messageservice.sendMessage('Message from waqas to login');
//   this.messageservice.sendMessage(this.value[0]);  
// }

// clearMessage(): void {
//     // clear message
//     this.messageservice.clearMessage();
// }
newMessage() {
  this.messageservice.changeMessage(true);
}

}
