import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';


import { ComponentsComponent } from './components.component';

import { ProjectionHolderComponent } from './projection-holder/projection-holder.component';
import { ProjectionComponent } from './projection/projection.component';
import { SeatComponent } from './seat/seat.component';
import { SeatHolderComponent } from './seat-holder/seat-holder.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module
    ],
    declarations: [
        ComponentsComponent,
        ProjectionHolderComponent,
        ProjectionComponent,
        SeatComponent,
        SeatHolderComponent
    ],
    entryComponents: [],
    exports:[ ComponentsComponent,ProjectionComponent,ProjectionHolderComponent,SeatComponent,SeatHolderComponent ]
})
export class ComponentsModule { }
