import { Component, OnInit } from '@angular/core';

import { Narration, Section } from '../model/narration-model';

@Component({
  selector: 'app-narration-create',
  templateUrl: './narration-create.component.html',
  styleUrls: ['./narration-create.component.css']
})
export class NarrationCreateComponent implements OnInit {

  model: Narration;

  constructor() {
    this.model = new Narration();
    this.model.addSection(new Section());
  }

  ngOnInit() {
  }

  createNewSection() {
    this.model.addSection(new Section());
  }

  debug(): string {
    return JSON.stringify(this.model);
  }

}
