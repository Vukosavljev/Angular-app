import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCardComponent } from './add-card/add-card.component';
import { CardViewComponent } from './card-view/card-view.component';


const routes: Routes = [
  { path: 'card-view', component: CardViewComponent },
  { path: 'add-card', component: AddCardComponent },
  {
    path: '',
    redirectTo: '/card-view',
    pathMatch: 'full',
  },
  // TODO
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
