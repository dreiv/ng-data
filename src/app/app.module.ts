import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonsService } from './services/persons.service';
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
  providers: [PersonsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
