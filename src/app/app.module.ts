import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { NarrationCreateComponent } from './narration-create/narration-create.component';
import { NarrationComponent } from './narration/narration.component';
import { NarrationListComponent } from './narration-list/narration-list.component';

import { NarrationService } from './narration.service';
import { LogService } from './log.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NarrationCreateComponent,
    NarrationComponent,
    NarrationListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    NarrationService,
    LogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
