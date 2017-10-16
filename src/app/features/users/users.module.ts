import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    MatTableModule
  ],
  declarations: [UsersComponent],
  exports: [UsersComponent]
})
export class DataGridModule {}
