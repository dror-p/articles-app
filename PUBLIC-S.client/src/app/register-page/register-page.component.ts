import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../models/User.model';
import { registerService } from './services/registerService';
import { loginService } from '../login-page/services/loginService.service';
import { Router } from '@angular/router';
import { Country } from '../models/Country.model';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent  {
  public countryList: Country[] = [];
  public register = this.formBuilder.group({
    email:'',
    password:'',
    firstName:'',
    lastName:'',
    country:'',
    isAdmin: false,
    isWriter: false,
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private registerservice: registerService, private loginService: loginService) { }

  ngOnInit(): void {
    this.registerservice.getUsersCountries().subscribe(list => {
      this.countryList = list
    }) 
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  firstNameFormControl = new FormControl('', [
    Validators.required
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);

  countryFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  matcher = new MyErrorStateMatcher();

  onSubmit(): void {
    let register:User = this.register.value as User;
    if(register.email !="" && register.password!=""){
      this.registerservice.SaveRegistration(register, "").subscribe();
      //login the current user
      this.router.navigate(['/login']);
      this.loginService.loginUser({"username": register.email, "password": register.password}, "")
    }
  };
}