import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataGridModule } from '../features/users/users.module';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [
    CommonModule,

    DataGridModule
  ]
})
export class SharedModule {}
