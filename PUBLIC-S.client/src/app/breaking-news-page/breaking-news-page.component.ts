import { Component, OnInit } from '@angular/core';
import { BreakingNewsService } from '../services/breaking-news.service';

@Component({
  selector: 'app-breaking-news-page',
  templateUrl: './breaking-news-page.component.html',
  styleUrls: ['./breaking-news-page.component.css']
})
export class BreakingNewsPageComponent implements OnInit {
  updates = [{"author": "",
  "content": "",
  "date": "",
  "_id": ""
  }];
  searchGen: String = ""

  constructor( private breakingNewsService:BreakingNewsService) { }

  async ngOnInit(): Promise<void> {

  await this.breakingNewsService.getBreakingNewsByPage(0).subscribe(
    updatesNew => 
    {this.updates = updatesNew
    }
  )
  }
  public onClickedSearch(){
    var str = this.searchGen.split(` `).join(`,`)
    this.breakingNewsService.getBreakingNewsFindBy(str).subscribe(list => {
      this.updates = list;          
    })
  }

}
