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
import { AuthguardService } from '../authguard.service';
import { MyQueryComponent } from './my-query/my-query.component';


const routes: Routes = [
  { path: 'DashBoard', component: DashBoardComponent, },
  { path: 'GenerateUrl', component: GenerateShortUrlComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_CUSTOMER' }  },
  { path: 'UserPlan', component: MyPlansComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_CUSTOMER' }  },
  { path: 'UserUrls', component: MyUrlsComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_CUSTOMER' }  },
  { path: 'UserQuery', component: QueryComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_CUSTOMER' }  },
  { path: 'UpdateProfile', component: UpdateProfileComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_CUSTOMER' }  },
  { path: 'Register', component: RegisterComponent },
  { path: 'BuyPlan', component: BuyPLanComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_CUSTOMER' } },
  { path: 'Redirect', component: RedirectUrlComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_CUSTOMER' } },
  { path: 'ViewUserQuery', component: MyQueryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
