import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { GenerateShortUrlComponent } from './generate-short-url/generate-short-url.component';
import { MyPlansComponent } from './my-plans/my-plans.component';
import { MyUrlsComponent } from './my-urls/my-urls.component';
import { QueryComponent } from './query/query.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { RegisterComponent } from './register/register.component';
import { BuyPLanComponent } from './buy-plan/buy-plan.component';
import { RouterModule } from '@angular/router';
import { CheckoutDialogComponentComponent } from './checkout-dialog-component/checkout-dialog-component.component';
import { AuthModule } from '../auth/auth.module';


import { RedirectUrlComponent } from './redirect-url/redirect-url.component';
import { Nav2Component } from './nav2/nav2.component';
import { MyQueryComponent } from './my-query/my-query.component';




@NgModule({
  declarations: [
    DashBoardComponent,
    ContainerComponent,
    FooterComponent,
    NavComponent,
    HeaderComponent,
    GenerateShortUrlComponent,
    MyPlansComponent,
    MyUrlsComponent,
    QueryComponent,
    UpdateProfileComponent,
    RegisterComponent,
    BuyPLanComponent,
    CheckoutDialogComponentComponent,
    RedirectUrlComponent,
    Nav2Component,
    MyQueryComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    AuthModule

  ]
})
export class UserModule { }
