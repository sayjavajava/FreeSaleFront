import { CategoryService } from './../services/category.service';
import { NotFound } from './../common/NotFound';
import { AppError } from './../common/AppError';
import { BadRequest } from './../common/BadRequest';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  value: any[];
  //private UrlSource = "api/allheros";
  constructor( private userservice:UserService) { 
     }

  delete(user){
    this.userservice.delete(user)
    .subscribe(response =>{
   //  console.log(response.status);
     console.log('test'+ user.id); 
     let index =this.value.indexOf(user);
       this.value.splice(index,1);
    },(error:AppError)=>{
      if(error instanceof BadRequest){
        alert('try again plz');}
      
     else throw error;
  
  })}


  addUser(input :HTMLInputElement){
     let hero ={name : input.value  }
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
    
  //   this.http.post(this.UrlSource,JSON.stringify(hero),options).subscribe(response =>{
  //     this.value.splice(0,0,hero);
  //     input.value ='';

  //     console.log(response.status);
  //  });

  
  this.userservice.create(input).subscribe(response =>{
  //  hero['id'] = response.json().id;
    this.value.splice(0,0,hero);
    input.value='';
},(error :AppError) =>{
  if(error instanceof BadRequest){
    console.log('orig'+error.origionalerror);
    alert("please check your data format ");
  }else  throw error;
})

}

   ngOnInit() {
   // this.userservice.getAll().subscribe(res => this.value = res);
  
  }

}
