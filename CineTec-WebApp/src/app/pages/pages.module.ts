import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';
import { ComponentsModule } from 'app/components/components.module';
import { TicketsComponent } from './tickets/tickets.component';
import { SeatsComponent } from './seats/seats.component';
import { BranchesAdminComponent } from './branches-admin/branches-admin.component';
import { ClientsComponent } from './clients/clients.component';
import { EmployeeComponent } from './employee/employee.component';
import { MoviesComponent } from './movies/movies.component';
import { ProjectionsComponent } from './projections/projections.component';
import { RoomsComponent } from './rooms/rooms.component';
import { BillingComponent } from './billing/billing.component';
import { XmlComponent } from './xml/xml.component';
import { PdfComponent } from './pdf/pdf.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ComponentsModule,
    ],
    declarations: [
        SignupComponent,
        ProfileComponent,
        HomeComponent,
        ListingComponent,
        TicketsComponent,
        SeatsComponent,
        BranchesAdminComponent,
        ClientsComponent,
        EmployeeComponent,
        MoviesComponent,
        ProjectionsComponent,
        RoomsComponent,
        BillingComponent,
        XmlComponent,
        PdfComponent,
        
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
