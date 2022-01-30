import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/api-connect/models/user.model';
import { AuthService } from 'src/app/api-connect/services/auth.service';
import { EventosService } from 'src/app/api-connect/services/eventos.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public get userName() { return this.registerForm.get('userName')};
  public get email() { return this.registerForm.get('email')};
  public get password() { return this.registerForm.get('password')};

  public registerForm: FormGroup;
  public user: UserModel;
  public loadingLogin: boolean;

  constructor(
    public router: Router,
    //private toastr: ToastrService,
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
    this.registerForm = this.fb.group({
      userName: new FormControl(this.user.userName, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(4)])
    });

   }

  public ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigateByUrl('');
    }
  }

  public registro(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm)
      this.loadingLogin = true;
      this.user.userName = this.registerForm.controls['userName'].value;
      this.user.password = this.registerForm.controls['password'].value;
      this.user.email = this.registerForm.controls['email'].value;
      this.auth.registro(this.user).subscribe( (res: any) => {
        console.log(res.json());
        this.auth.saveToken(res);
        this.loadingLogin = false;
        this.router.navigateByUrl('');
        /**
         * this.toastr.clear();
          this.toastr.success('Bienvenido ' + this.user.email, 'Login correcto' );
         */
      },(err) => {
        console.log(err);
        if(err.status == 200){
          this.auth.saveToken(err.error.text);
          this.eventosService.setLogged(true);
          this.loadingLogin = false;
          this.router.navigateByUrl('');
        }
      });
    } else {
  /*      this.toastr.clear();
      this.toastr.success('Email o contraseña no válidos.', 'Login incorrecto' );*/
    }
  }

}
