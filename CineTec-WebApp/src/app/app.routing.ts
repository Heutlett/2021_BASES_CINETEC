import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { ListingComponent } from './pages/listing/listing.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { SeatsComponent } from './pages/seats/seats.component';
import { BranchesAdminComponent } from './pages/branches-admin/branches-admin.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ProjectionComponent } from './components/projection/projection.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { EmployeeComponent } from './pages/employee/employee.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'components',       component: ComponentsComponent },
    { path: 'home',             component: HomeComponent },
    { path: 'listing',          component: ListingComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'tickets',          component: TicketsComponent },
    { path: 'seats',            component: SeatsComponent },
    { path: 'branches',         component: BranchesAdminComponent },
    { path: 'clients',         component: ClientsComponent },
    { path: 'projections',         component: ProjectionComponent },
    { path: 'rooms',         component: RoomsComponent },
    { path: 'employees',         component: EmployeeComponent },
    


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
