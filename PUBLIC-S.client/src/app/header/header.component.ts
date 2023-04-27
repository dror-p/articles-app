import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  date = (new Date()).toISOString();
  constructor(){
    setInterval(() => {
      this.date = (new Date()).toISOString()
    }, 1000)
  }
  ngOnInit(): void {
  }

}
