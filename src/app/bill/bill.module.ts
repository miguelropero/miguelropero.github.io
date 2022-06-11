import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRoutingModule } from './bill-routing.module';
import { BillComponent, BillComponentNew } from './bill.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BillComponent, BillComponentNew, 
  ],
  imports: [
    CommonModule,
    BillRoutingModule,
    ReactiveFormsModule
  ]
})
export class BillModule { }
