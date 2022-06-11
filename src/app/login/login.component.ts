import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../model/index';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String = '';
  form: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  malFormato: boolean = false;
  user: User = new User(0,"","","0");
  error: boolean = false;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
  ) { 

    
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
  });
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  validate(event: Event) {
    
    this.error = false;
    this.malFormato = false;
    event.preventDefault();
    if(this.form.valid) {
      this.user.username = this.form.value.username;
      this.user.password = this.form.value.password;

      this.loginService.login(this.user).subscribe(
        (user: User) => {
          if(user.id){
            localStorage.setItem('username', user.username);
            this.router.navigate(['/bill/list/' + user.username]);
          }
          else {
            this.error = true;      
          }
        }
      );
    } else {
      this.form.markAllAsTouched();
      this.malFormato = true;
    }
  }

}
