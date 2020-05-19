import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['eve.holt@reqres.in', Validators.compose([
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        Validators.maxLength(50)])
      ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ])]
    });
  }

  ngOnInit() {
  }

  login() {
    if (!this.loginForm.valid) {
      this.errorAlert('Ingresa los datos correctamente');
      return;
    }

    this.http.post('https://reqres.in/api/login', this.loginForm.value).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['home'], { replaceUrl: true });
    }, err => {
      console.error(err);
      this.errorAlert(err.error.error);
    });
  }

  async errorAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
