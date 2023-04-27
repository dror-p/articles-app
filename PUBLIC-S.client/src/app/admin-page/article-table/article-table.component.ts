import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Article } from 'src/app/models/Article';
import { ArticlesService } from 'src/app/services/articles.service';

export interface articleData {
  id: String |undefined;
  title: String;
}

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.css']
})
export class ArticleTableComponent implements OnInit {
  dataSource: MatTableDataSource<articleData> ;
  private articles : articleData[] = [];
  displayedColumns: string[] = [ 'Title', 'delete'];

  constructor( private articleService:ArticlesService) { 
    this.dataSource= new MatTableDataSource(this.articles);
  }

  async ngOnInit(): Promise<void> {
    await this.articleService.getArticles().subscribe(
      usersT =>{
      usersT.forEach((a: Article) => {
        this.articles.push({
          id: a._id,
          title: a.title
        });
      });
      this.dataSource= new MatTableDataSource(this.articles);  
     }
    )
  }
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  async onClickedDelete(id: string){
    await this.articleService.deleteArticle(id).subscribe()
      for(let i = 0; i < this.articles.length; ++i){
        if (this.articles[i].id === id) {
          this.articles.splice(i,1);
        }
    }
      this.dataSource = new MatTableDataSource(this.articles);   
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}