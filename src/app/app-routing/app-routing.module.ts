import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NarrationCreateComponent } from '../narration-create/narration-create.component';
import { NarrationComponent } from '../narration/narration.component';

const routes: Routes = [
  {
    path: 'narration/create',
    component: NarrationCreateComponent
  },
  {
    path: 'narration/:id',
    component: NarrationComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }