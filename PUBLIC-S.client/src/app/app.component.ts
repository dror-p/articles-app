import { Component } from '@angular/core';
import { ArticlesService } from './services/articles.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ArticlesService
  ]
})
export class AppComponent {
  title = 'Public.s';    
}