import { AuthenticationService } from './authentication.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import { DataService } from './DataService';

@Injectable()
export class UserService extends DataService  {
 private  autservice :AuthenticationService
 

  constructor(http:Http,authservice:AuthenticationService) {
   super('http://localhost:8080/category',http,authservice);
  }


}