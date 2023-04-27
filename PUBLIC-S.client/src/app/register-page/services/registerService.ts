import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class registerService {
  constructor(private http: HttpClient) { }

 public SaveRegistration(newUser: any, response: any): Observable<any> {
    return this.http.post('http://localhost:8080/Users/register', newUser, response);
  }

  public getUsersCountries(): Observable<any>{
    return this.http.get(`http://localhost:8080/Countries`)
  }
 }