import { Injectable } from '@angular/core';
import { Article } from '../models/Article';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  public url = 'ws://localhost:14000'
  public connection = new WebSocket(this.url)

  constructor(private http:HttpClient) {

    this.connection.onopen = () => {
      this.connection.send('Message From Client')
    }
    
    this.connection.onerror = (error) => {
    }
  
    this.connection.onmessage = (e) => {
    }
  }

  public getArticles(): Observable<any>{
    var t = this.http.get('http://localhost:8080/Article')
    return t;
  }

  public addArticle(Article: Article){
    var headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');
      if (localStorage.getItem("userToken")){
       headers = headers.append('Authorization', `${localStorage.getItem("userToken")}` );
      }
    return this.http.post('http://localhost:8080/Article', Article, {headers} ).subscribe();
  }

  public getArticle(_id: String): Observable<any>{
      return this.http.get(`http://localhost:8080/Article/` + _id);
  }

  public getArticlesByField(): Observable<any>{
    return this.http.get(`http://localhost:8080/Article/group/byField`)
  }
  public getArticlesByPage( page: Number): Observable<any>{
    return this.http.get(`http://localhost:8080/Article/page/` + page)
  }

  public getArticlesField( q: String): Observable<any>{
    return this.http.get(`http://localhost:8080/Article/?q=` + q)
  }

  public getArticlesAverageWord(): Observable<any>{
    return this.http.get(`http://localhost:8080/Article/q/averageWords`)
  }

  public getArticlesByDate(day: any , month: any, year: any ): Observable<any>{
    return this.http.get(`http://localhost:8080/Article/bydate/`+ day +  `/` + month + `/` + year  )
  }

  public deleteArticle(_id: String): Observable<any>{
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    if (localStorage.getItem("userToken")){
     headers = headers.append('Authorization', `${localStorage.getItem("userToken")}` );
    }
    return this.http.delete(`http://localhost:8080/Article/` + _id , {"headers": headers});      
  }
    
  public listenForNewItem = () => {
    return new Observable((observer) => {
      this.connection.onmessage = (e) => {
        let t = e
        observer.next(JSON.parse(e.data))
      }
    });
  };
}