import { ProductService } from './../services/product.service';
import { Category } from './../common/Category';

import { UserService } from './../services/user.service';
import { UploadFileService } from './../services/upload-file.service';
import { AuthenticationService } from './../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { NotFound } from './../common/NotFound';
import { AppError } from './../common/AppError';
import { BadRequest } from './../common/BadRequest';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  rForm :FormGroup;
  name:String;
  imageUrl:string;
  
  selectedCategory:any;
  active:boolean=true;
  submitted:boolean=false;
  isChecked:true;
  
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

quantity:number[];

items: Category[];

  categoriesItem=[
    {id:1,name:"computer"},
    {id:2,name:"Lcd"},
    {id:3,name:"mobile"},
    {id:4,name:"camera"},
  ]
  constructor(
    private fb : FormBuilder,  
    private router : Router,
      private productservice : ProductService,
      private snackbar:MatSnackBar,
      private uploadfileservice :UploadFileService,
      private categoryservice:CategoryService
      //      private heroservice?:HeroService 
    ) { 

    }

getCategory(){
      this.categoryservice.getAll().subscribe(res => this.items = res,error=>AppError); 
      
    }
  ngOnInit() {
    this.categoryservice.getAll().subscribe(res => this.items = res); 
    // reset login status
  //    this.authenticationService.logout();

  var N = 10; 
  this.quantity =Array.apply(null, {length: N}).map(Number.call, Number);
 // this.getCategory();
  
//     console.log('tan:'+ this.value);
     
     //pattern for validate only lettere [a-zA-Z_]+
   //pattern for only numbers [0-9]+
     this.rForm =this.fb.group({  
    'name': [null,Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(4),Validators.pattern('[a-zA-Z_]+')])],
    'description':[null,Validators.compose([Validators.required,Validators.maxLength(20),Validators.minLength(8)])],
    'selectedCategory':[null,Validators.required],
    'price':[null,Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(8)])],
    'InStock':[null],
      sku:[''],
      quantity:[null,Validators.required]
  
      // 'imageUrl':[null,Validators.required],
    })
}
AddProduct(post){
  console.log("take:"+post.InStock);
  this.productservice.create(post).subscribe(response =>{
  //  hero['id'] = response.json().id;
   this.upload();
  this.openSnackBar("Product saved","successfully");
  this.rForm.reset();
  this.active=false;
  setTimeout(() => this.active = true, 0);
  
  },(error :AppError) =>{
  if(error instanceof BadRequest){
    console.log('orig'+error.origionalerror);
    alert("please check your data format ");
  }else  throw error;
})

}

openSnackBar(message: string, action: string) {
  this.snackbar.open(message, action, {
    duration: 2000,
  });
}
selectFile(event) {
  const file = event.target.files.item(0)
  if (file.type.match('image.*')) {
    this.selectedFiles = event.target.files;
    let file= event.target.files[0];
  let filename = file.name;
  console.log('name'+ filename);
  } else {
    alert('invalid format!');
  }
}

upload() {
  this.progress.percentage = 0;

  this.currentFileUpload = this.selectedFiles.item(0)
  this.productservice.pushFileToStorage(this.currentFileUpload).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress.percentage = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
      console.log('File is completely uploaded!');
    this.currentFileUpload=null
    }
  })
 this.selectedFiles = undefined;
}

}
