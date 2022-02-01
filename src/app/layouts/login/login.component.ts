import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/api-connect/models/user.model';
import { AuthService } from 'src/app/api-connect/services/auth.service';
import { EventosService } from 'src/app/api-connect/services/eventos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public get email() { return this.loginForm.get('email')};
  public get password() { return this.loginForm.get('password')};

  public loginForm: FormGroup;
  public user: UserModel;
  public loadingLogin: boolean;

  constructor(
    public router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private auth: AuthService,
    private eventosService: EventosService,
  ) {

    this.loadingLogin = false;
    this.user = {
      id: 0,
      email: '',
      password: '',
      userName: '',
      rol: 0
    };
    this.loginForm = this.fb.group({
      userName: new FormControl(this.user.userName, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(4)])
    });

  }

  public ngOnInit(): void {

    /*if (this.auth.isAuthenticated()) {

      this.router.navigateByUrl('');

    }*/

  }

  public login(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm)
      this.loadingLogin = true;
      this.user.userName = this.loginForm.controls['userName'].value;
      this.user.password = this.loginForm.controls['password'].value;
      this.auth.login(this.user).subscribe( (res: any) => {
        console.log(res.json());
        this.auth.saveToken(res);
        this.loadingLogin = false;
        this.router.navigateByUrl('');
        this.toastr.clear();
        this.toastr.success('Bienvenido ' + this.user.userName, 'Login correcto' );
      },(err) => {
        console.log(err);
        if(err.status == 200){
          this.auth.saveToken(err.error.text);
          this.eventosService.setLogged(true);
          this.loadingLogin = false;
          this.router.navigateByUrl('');
        }else if(err.status == 400){
          this.toastr.clear();
          this.toastr.error('Usuario o contraseña no válidos.', 'Login incorrecto' );    
        }
      });
    } else {
      this.toastr.clear();
      this.toastr.error('Usuario o contraseña no válidos.', 'Login incorrecto' );
    }
  }

}
