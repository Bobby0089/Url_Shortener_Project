import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { BlackListUserComponent } from './black-list-user/black-list-user.component';
import { ManagePlansComponent } from './manage-plans/manage-plans.component';
import { ManageQueriesComponent } from './manage-queries/manage-queries.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ManageUrlsComponent } from './manage-urls/manage-urls.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ViewPlanComponent } from './view-plan/view-plan.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { UpdatePlanComponent } from './update-plan/update-plan.component';
import { AuthguardService } from '../authguard.service';


const routes: Routes = [
  { path: 'DashBoard', component: DashBoardComponent},
  { path: 'BlackListUser', component: BlackListUserComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_ADMIN' } },
  { path: 'ManagePlans', component: ManagePlansComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_ADMIN' } },
  { path: 'ManageQueries', component: ManageQueriesComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_ADMIN' }  },
  { path: 'Transactions', component: TransactionComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_ADMIN' }  },
  { path: 'ManageUrls', component: ManageUrlsComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_ADMIN' }  },
  { path: 'ManageUsers', component: ManageUsersComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_ADMIN' }  },
  { path: 'ViewPlans', component: ViewPlanComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_ADMIN' } },
  { path: 'CreatePlan', component: CreatePlanComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_ADMIN' } },
  { path: 'UpdatePlan', component: UpdatePlanComponent,  canActivate : [AuthguardService], data: { role: 'ROLE_ADMIN' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
