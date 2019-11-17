import { GridViewComponent } from './home/grid-view/grid-view.component';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GetHhMmPipe } from './pipes/get-hh-mm.pipe';
import { AddCardComponent } from './add-card/add-card.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { HomeComponent } from './home/home.component';
import { CardViewComponent } from './home/card-view/card-view.component';
import { CardComponent } from './home/card-view/card/card.component';
import { FilterComponent } from './home/card-view/filter/filter.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        GridViewComponent,
        CardViewComponent,
        CardComponent,
        FilterComponent,
        AddCardComponent,
        EditCardComponent,
        GetHhMmPipe,
    ],
    imports: [FlexLayoutModule, SharedModule, AppRoutingModule],
    providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
