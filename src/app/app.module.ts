import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonsDatabaseService } from './persons-database.service';
import { SharedModule } from './shared';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // shared
    SharedModule
  ],
  providers: [PersonsDatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule {}
