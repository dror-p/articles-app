import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
  
@Injectable({
  providedIn: 'root'
})
export class BreakingNewsService {
  constructor(private http:HttpClient) { }

  public getBreakingNewsByPage( page: Number): Observable<any>{
    return this.http.get(`http://localhost:8080/BreakingNews/page/` + page)
  }

  public getBreakingNewsFindBy( words: String): Observable<any>{
    return this.http.get(`http://localhost:8080/BreakingNews/q/` + words)
  }
}