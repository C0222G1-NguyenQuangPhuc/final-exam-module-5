import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TicketListComponent} from './ticket/ticket-list/ticket-list.component';
import {TicketCreateComponent} from './ticket/ticket-create/ticket-create.component';


const routes: Routes = [
  {path: 'ticket', component: TicketListComponent},
  {path: 'ticket/create', component: TicketCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
