import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCardComponent } from './add-card/add-card.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'add-card', component: AddCardComponent },
    { path: 'edit-card', component: EditCardComponent },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
    // TODO
    // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
