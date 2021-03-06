import { UserName } from './../common/UserName';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/share';

@Injectable()
export class MessageService {
    private subject = new Subject<any>();

    sendMessage(message: string) {
        this.subject.next({ text: message });
        console.log('called:' + message);
    }
    clearMessage() {
        this.subject.next();
    }
    getMessage(): Observable<any> {    
      console.log('message geting');
        return this.subject.asObservable();
     }

     //for generic way
    private messageSource = new BehaviorSubject<boolean>(false);
    currentMessage = this.messageSource.asObservable();
    constructor(private httpclient:HttpClient) {
      
     }
    changeMessage(message: boolean) {
      this.messageSource.next(message)
    }


//for flag dialog singin
public onChange: EventEmitter<boolean> = new EventEmitter<boolean>();

public doSomething(message: boolean) {
    // do something, then...
    this.onChange.emit(message);
}
  //for username exisitance in signup component    
    packagedata: Subject<Array<UserName>> =new BehaviorSubject<Array<UserName>>([]);

    loadAllPackages () {
		this.httpclient
		.get('api/getAllUsersNames')
		.subscribe (
			(data: any) => {
				this.packagedata.next(data);
			},
			(err: any) => console.error("loadAllPackages: ERROR"),
			() => console.log("loadAllPackages: always")
		);
	}
    

  //isAdmin
  

}


