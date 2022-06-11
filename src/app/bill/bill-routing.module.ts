import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent, BillComponentNew } from './bill.component';

const routes: Routes = [
  { path: '', component: BillComponent },
  { path: 'list/:username', component: BillComponent },
  { path: 'new', component: BillComponentNew },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }
