import { Component, OnInit } from '@angular/core';

import { Narration, Section } from '../model/narration-model';
import { NarrationService } from '../narration.service';

@Component({
  selector: 'app-narration-create',
  templateUrl: './narration-create.component.html',
  styleUrls: ['./narration-create.component.css'],
  providers: [
    NarrationService
  ]
})
export class NarrationCreateComponent implements OnInit {

  model: Narration;
  service: NarrationService;

  constructor(narrationService: NarrationService) {
    this.service = narrationService;
    this.model = new Narration();
    this.model.addSection(new Section());
  }

  ngOnInit() {
  }

  createNewSection() {
    this.model.addSection(new Section());
  }

  createNarration() {
    this.service.addNarration(this.model);
  }

  debug(): string {
    return JSON.stringify(this.model);
  }

}
