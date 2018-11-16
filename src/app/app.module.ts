import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { NarrationCreateComponent } from './narration-create/narration-create.component';
import { NarrationComponent } from './narration/narration.component';
import { NarrationListComponent } from './narration-list/narration-list.component';

import { NarrationService } from './narration.service';
import { LogService } from './log.service';
import { RecorderService } from './recorder.service';
import { HomeComponent } from './home/home.component';
import { NarrationRecorderComponent } from './narration-recorder/narration-recorder.component';

@NgModule({
  declarations: [
    AppComponent,
    NarrationCreateComponent,
    NarrationComponent,
    NarrationListComponent,
    HomeComponent,
    NarrationRecorderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    NarrationService,
    RecorderService,
    LogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
