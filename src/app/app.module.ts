import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from './material/material.module';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GridViewComponent } from './grid-view/grid-view.component';
import { CardViewComponent } from './card-view/card-view.component';
import { CardComponent } from './card-view/card/card.component';
import { GetHhMmPipe } from './pipes/get-hh-mm.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GridViewComponent,
    CardViewComponent,
    CardComponent,
    GetHhMmPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
