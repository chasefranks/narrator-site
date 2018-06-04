import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NarrationCreateComponent } from '../narration-create/narration-create.component';
import { NarrationComponent } from '../narration/narration.component';
import { NarrationListComponent } from '../narration-list/narration-list.component';

const routes: Routes = [
  {
    path: 'narration/create',
    component: NarrationCreateComponent
  },
  {
    path: 'narration/list',
    component: NarrationListComponent
  },
  {
    path: 'narration/:id',
    component: NarrationComponent
  },
  {
    path: '',
    component: NarrationListComponent
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
