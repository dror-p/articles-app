import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventEmitter, Input, Output} from '@angular/core'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FieldsComponent implements OnInit {
  public fields: String[] = ["Politics","Tech","Sports","World","Science","Economics","Health","Gossip","Opinions","Arts"]
  searchGen: String ="";
  searchQ!: String;
  date = new Date(2000, 0, 2);
  
  @Input() articles!: any[] ;
  @Output() articleChange = new EventEmitter();
  constructor(private articleService:ArticlesService) { }

  ngOnInit(): void {
  }

  public onClickedSearch(){
    this.search(this.searchGen);
  }

  public chooseField(e: MatTabChangeEvent){
    this.searchQ = e.tab.textLabel;
      this.search(this.searchQ);
  }

  public search(q : String){
    this.articleService.getArticlesField(q).subscribe(list => {
      this.articles = list;
          this.articleChange.emit(this.articles);
    })
  }

  valueChanged(event: MatDatepickerInputEvent<Date>){
    let date = {
      "day":event.value?.getDate(),
      "month": event.value?.getMonth(),
      "year": event.value?.getFullYear()
    }
      this.articleService.getArticlesByDate(event.value?.getDate(), event.value?.getMonth() , event.value?.getFullYear() ).subscribe(list => {
        this.articles = list;
            this.articleChange.emit(this.articles);
      })
  }
}
