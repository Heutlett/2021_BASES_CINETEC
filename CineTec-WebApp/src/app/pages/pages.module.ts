import { NgModule } from '@angular/core';
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


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ComponentsModule
    ],
    declarations: [
        SignupComponent,
        ProfileComponent,
        HomeComponent,
        ListingComponent,
        TicketsComponent,
        SeatsComponent,
        
    ]
})
export class PagesModule { }
