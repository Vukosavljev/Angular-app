import { GridViewComponent } from './home/grid-view/grid-view.component';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { StoreModule } from '@ngrx/store';
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
import { EditFormWrapperComponent } from './home/grid-view/edit-form-wrapper/edit-form-wrapper.component';
import { SensorReducer } from './store/sensor.reducer';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        GridViewComponent,
        CardViewComponent,
        CardComponent,
        AddCardComponent,
        EditCardComponent,
        GetHhMmPipe,
        EditFormWrapperComponent
    ],
    imports: [
        FlexLayoutModule,
        SharedModule,
        AppRoutingModule,
        StoreModule.forRoot({ sensorList: SensorReducer })
    ],
    providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } }
    ],
    entryComponents: [EditFormWrapperComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
