import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GridViewComponent } from './grid-view/grid-view.component';
import { CardViewComponent } from './card-view/card-view.component';
import { CardComponent } from './card-view/card/card.component';
import { GetHhMmPipe } from './pipes/get-hh-mm.pipe';
import { FilterComponent } from './filter/filter.component';
import { AddCardComponent } from './add-card/add-card.component';
import { EditCardComponent } from './edit-card/edit-card.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        GridViewComponent,
        CardViewComponent,
        CardComponent,
        GetHhMmPipe,
        FilterComponent,
        AddCardComponent,
        EditCardComponent
    ],
    imports: [FlexLayoutModule, SharedModule, AppRoutingModule],
    providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
