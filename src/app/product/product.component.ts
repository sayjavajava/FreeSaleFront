import { AuthenticationService } from './../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  rForm :FormGroup;
  name:String;
  imageUrl:string;
  selectedcategory=2;
  category:string;
  active:boolean=true;
  submitted:boolean=false;
  isChecked:true;
  
  categoriesItem=[
    {id:1,name:"computer"},
    {id:2,name:"Lcd"},
    {id:3,name:"Mobile"},
    {id:4,name:"Camera"},
  ]
  constructor(
    private fb : FormBuilder,  
    private router : Router,
      private authenticationService : AuthenticationService,
      private snackbar:MatSnackBar
      
//      private heroservice?:HeroService 
    ) { 
          }
  ngOnInit() {
      // reset login status
  //    this.authenticationService.logout();
   this.rForm =this.fb.group({
    'name': [null,Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(4)])],
    'description':[null,Validators.compose([Validators.required,Validators.maxLength(20),Validators.minLength(8)])],
    'category':[null,Validators.required],
    'price':[null,Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(8)])],
    'isChecked':[null],
    'imageUrl':[null,Validators.required],
    
})

}
logout(){
  this.authenticationService.logout();
  console.log("i am clled in logout");
}

addProduct(post){
  this.name=post.name;
  this.isChecked=post.isChecked;
this.imageUrl=post.imageUrl;
  console.log("take:"+this.isChecked);
  this.openSnackBar("Product saved","successfully");
  this.rForm.reset();
  this.active=false;
  setTimeout(() => this.active = true, 0);
  
}

openSnackBar(message: string, action: string) {
  this.snackbar.open(message, action, {
    duration: 2000,
  });
}

}
