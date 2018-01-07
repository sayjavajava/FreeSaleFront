import { UpdateRoleComponent } from './../update-role/update-role.component';
import { MatDialog, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { Loading } from './../common/Loading';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/table';
import { UserUtil } from './../common/UserUtil';
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
  displayedColumns = ['Name','Email','Active','Authorities','Edit','Delete'];
   isLoading:boolean;
   userslist:UserUtil[]=[];
   value: any[];
   static urlarray;

   pageEvent: PageEvent;
   pageSize = 10;
   pageSizeOptions: Array<number> = [5, 10, 25, 100];
   
   dataSource = new UserDataSource(this.userservice);
  constructor( private userservice :UserService,private router:Router,private matdialog:MatDialog) { 
    let flagobj=new Loading();
    this.isLoading=flagobj.isLoading;
    UserComponent  .urlarray =true;
     console.log(flagobj.isLoading);
  }

  get staticUrlArray():boolean {
    return UserComponent.urlarray;
      }
  myEvent(event) {
    console.log(event);
      }

delete(user){
     if(user.id){
    this.userservice.delete(user.id).subscribe(data=>console.log(data));
    this.router.navigate(['/home']);
    }
}

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
editUserPage(user: UserUtil) {
  if (user) {
this.matdialog.open(UpdateRoleComponent,{data:user.id});
  //  this.router.navigate(['/user/edit', user.id]);
   }
}

closeDialog(){
  this.matdialog.closeAll();
 }
ngOnInit() {
//   this.userservice.getAll().subscribe(response => this.userslist =response);

//this.isLoading=true;
// console.log('flag:'+this.isLoading);
// setInterval(()=>{
//  this.dataSource = new UserDataSource(this.userservice);
//  this.isLoading=false;
// },2000);

//this.userslist = this.userservice.getAll();

UserComponent.urlarray=false;

//this.userservice.findAllUsersNameOnly().subscribe(data=>(console.log(data.body)

//));

}

}

export class UserDataSource extends DataSource<any> {
  constructor(private userservice: UserService) {
    super();


  }
  connect(): Observable<UserUtil[]> {
 //testing server  with hardcoded value;
 //i want here more params for etc page, size,sort  

   const flagobj =new Loading();

   flagobj.isLoading=false;
  
   console.log(flagobj.isLoading); 

   return this.userservice.findAllUsers();
            }
  disconnect() {}
}
