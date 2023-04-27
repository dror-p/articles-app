import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from '../models/Article';
import { BreakingNewsService } from '../services/breaking-news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  updates = [{"author": "",
  "content": "",
  "date": "",
  "_id": ""
  }];

  @Input() searchQ!: String;
  @Output() searchQChange = new EventEmitter();

  @Input() articles: Article[] | [] = [] ;
  @Output() articleChange = new EventEmitter();
  constructor( private breakingNewsService:BreakingNewsService) { }

  async ngOnInit(): Promise<void> {
    await this.breakingNewsService.getBreakingNewsByPage(0).subscribe(updatesNew => {
      this.updates = updatesNew
    })
  }
}