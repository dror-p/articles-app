import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-new-article-page',
  templateUrl: './new-article-page.component.html',
  styleUrls: ['./new-article-page.component.css']
})
export class NewArticlePageComponent implements OnInit {
  selected = 'option2';
  userWriter = ""
  fields = [ "Arts", "Opinions","Gossip", "Health", "Economics", "Science", "World", "Sports", "Tech", "Politics"]

  title: String ="";
  subTitle: String ="";
  content: String = "";
  writer: String = "";
  field: String="";
  imageUrl: String="";

  constructor(private articleService:ArticlesService, ) { }

  addArticle(){

    if(localStorage.getItem("userToken")){
      this.writer = JSON.parse(localStorage.getItem('user') || '{}')._id ;    
      var newArticle = {
        title: this.title,
        subTitle :this.subTitle,
        content: this.content,
        writer: this.writer,
        field: this.field,
        imageUrl: this.imageUrl,
    }
    var t = this.articleService.addArticle(newArticle);  
    }else{
      console.log("not permitted")
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem("userToken")){
      this.userWriter = JSON.parse(localStorage.getItem('user') || '{}').firstName + " " +
      JSON.parse(localStorage.getItem('user') || '{}').lastName   ;    
       
    }else{
      console.log("not permitted")
    }
  }
}