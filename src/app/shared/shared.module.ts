import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { CardFormComponent } from './card-form/card-form.component';
import { ConfirmationDialogueComponent } from './confirmation-dialogue/confirmation-dialogue.component';

@NgModule({
    declarations: [CardFormComponent, ConfirmationDialogueComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        CardFormComponent,
        ConfirmationDialogueComponent
    ],
    entryComponents: [ConfirmationDialogueComponent]
})
export class SharedModule {}
