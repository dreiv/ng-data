import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatCheckboxModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { UsersComponent } from '../features/users/users.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CdkTableModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [UsersComponent],
  exports: [
    CommonModule,

    UsersComponent
  ]
})
export class SharedModule {}
