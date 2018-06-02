import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { NarrationCreateComponent } from './narration-create/narration-create.component';
import { NarrationComponent } from './narration/narration.component';

@NgModule({
  declarations: [
    AppComponent,
    NarrationCreateComponent,
    NarrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
