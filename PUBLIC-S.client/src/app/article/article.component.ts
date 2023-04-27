import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { Article } from '../models/Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() articles: Article[] = [] ;
  @Output() articleChange = new EventEmitter();

  constructor(private articleService:ArticlesService) {
   }

  ngOnInit(): void {
  }  
}
