import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

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
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule
    ],
    providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
