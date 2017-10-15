import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { DataGridComponent } from './data-grid.component';

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    MatTableModule
  ],
  declarations: [DataGridComponent],
  exports: [DataGridComponent]
})
export class DataGridModule {}
