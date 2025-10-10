import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { NavComponent } from './nav/nav.component';
import { ConatinerComponent } from './conatiner/conatiner.component';
import { FooterComponent } from './footer/footer.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PlansComponent } from './plans/plans.component';
import { AboutComponent } from './about/about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
  declarations: [
    NavComponent,
    ConatinerComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    PlansComponent,
    AboutComponent

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ]
})
export class AuthModule { }
