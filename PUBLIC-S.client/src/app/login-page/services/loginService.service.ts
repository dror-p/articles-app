import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class loginService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private _isWriter = new BehaviorSubject<boolean>(false);
  private _isAdmin = new BehaviorSubject<boolean>(false);
  private _userName = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  get isLoggedIn() {    
    if(localStorage.getItem("userToken")){
      this._isLoggedIn.next(true);      
    }else{
      this._isLoggedIn.next(false);
    }
    return this._isLoggedIn.asObservable();
  }

  get isWriter() {    
    if(JSON.parse(localStorage.getItem('user') || '{}').isWriter){
      this._isWriter.next(true);      
    }else{
      this._isWriter.next(false);
    }
    return this._isWriter.asObservable();
  }

  get isAdmin() {    
    if(JSON.parse(localStorage.getItem('user') || '{}').isAdmin){
      this._isAdmin.next(true);      
    }else{
      this._isAdmin.next(false);
    }
    return this._isAdmin.asObservable();
  }

  get userName() {
    if(localStorage.getItem("userToken")) {
      this._userName.next(JSON.parse(localStorage.getItem('user') || '{}').firstName);
    } else {
      this._userName.next('');
    }
    return this._userName.asObservable();
  }

  public isUserAdmin(): boolean {
    return this._isAdmin.value;
  }

  public isUserWriter(): boolean {
    return this._isWriter.value;
  }

 public loginUser(user: any, response: any): Observable<any> {
    return this.http.post('http://localhost:8080/Users/login', user, response);
  }
  
  public getUserByEmail(userEmail: string): Observable<any> {
    return this.http.get('http://localhost:8080/Users/getByEmail/' + userEmail);
  }
}