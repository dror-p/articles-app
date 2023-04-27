import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginService } from '../login-page/services/loginService.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  showInput = false;
  userName: string = '';
  isUserWriter: boolean = false;
  isUserAdmin: boolean = false;

  constructor(public loginService: loginService, private router: Router) {  }

  CheckIfLoggedin(){
    if(localStorage.getItem("userToken")){
      return true;
    }else{
      return false
    }
  }

  CheckIfWriter(){
    if(JSON.parse(localStorage.getItem('user') || '{}').isWriter){
      return true;
    }else{
      return false
    }
  }

  CheckIfAdmin(){
    if(JSON.parse(localStorage.getItem('user') || '{}').isAdmin){
      return true;
    }else{
      return false
    }
  }

  onClickedSearch(){
    this.showInput = !this.showInput;
  }

  onClickedHome() {
    this.router.navigate(['/']);
  }

  onClickedLogOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  
  
  public changeLoggedIn(): void {
  }

  ngOnInit(): void {
    if(!!localStorage.getItem('user')) {
      this.userName = JSON.parse(localStorage.getItem('user') || '{}').firstName;
      this.isUserWriter = JSON.parse(localStorage.getItem('user') || '{}').isWriter;
      this.isUserAdmin = JSON.parse(localStorage.getItem('user') || '{}').isAdmin;
    }
  }
}