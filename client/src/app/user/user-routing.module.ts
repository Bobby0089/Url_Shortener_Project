import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from '../user/dash-board/dash-board.component';
import { GenerateShortUrlComponent } from './generate-short-url/generate-short-url.component';
import { MyPlansComponent } from './my-plans/my-plans.component';
import { MyUrlsComponent } from './my-urls/my-urls.component';
import { QueryComponent } from './query/query.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { RegisterComponent } from './register/register.component';
import { BuyPLanComponent } from './buy-plan/buy-plan.component';
import { RedirectUrlComponent } from './redirect-url/redirect-url.component';
import { MyQueryComponent } from './my-query/my-query.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  { path: 'dashboard', component: DashBoardComponent }, // optionally protected
  { path: 'generate-url', component: GenerateShortUrlComponent, canActivate: [AuthGuard], data: { role: 'ROLE_CUSTOMER' } },
  { path: 'user-plan', component: MyPlansComponent, canActivate: [AuthGuard], data: { role: 'ROLE_CUSTOMER' } },
  { path: 'user-urls', component: MyUrlsComponent, canActivate: [AuthGuard], data: { role: 'ROLE_CUSTOMER' } },
  { path: 'user-query', component: QueryComponent, canActivate: [AuthGuard], data: { role: 'ROLE_CUSTOMER' } },
  { path: 'update-profile', component: UpdateProfileComponent, canActivate: [AuthGuard], data: { role: 'ROLE_CUSTOMER' } },
  { path: 'register', component: RegisterComponent }, // public
  { path: 'buy-plan', component: BuyPLanComponent, canActivate: [AuthGuard], data: { role: 'ROLE_CUSTOMER' } },
  { path: 'redirect', component: RedirectUrlComponent, canActivate: [AuthGuard], data: { role: 'ROLE_CUSTOMER' } },
  { path: 'view-user-query', component: MyQueryComponent } // optional guard
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
