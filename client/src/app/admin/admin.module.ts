import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContainerComponent } from './container/container.component';
import { BlackListUserComponent } from './black-list-user/black-list-user.component';
import { ManagePlansComponent } from './manage-plans/manage-plans.component';
import { ManageQueriesComponent } from './manage-queries/manage-queries.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ManageUrlsComponent } from './manage-urls/manage-urls.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { ViewPlanComponent } from './view-plan/view-plan.component';
import { UpdatePlanComponent } from './update-plan/update-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashBoardComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    BlackListUserComponent,
    ManagePlansComponent,
    ManageQueriesComponent,
    TransactionComponent,
    ManageUrlsComponent,
    ManageUsersComponent,
    CreatePlanComponent,
    ViewPlanComponent,
    UpdatePlanComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
