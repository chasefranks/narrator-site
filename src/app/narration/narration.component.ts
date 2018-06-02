import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Narration, Section } from '../model/narration-model';
import { NarrationService } from '../narration.service';

@Component({
  selector: 'app-narration',
  templateUrl: './narration.component.html',
  styleUrls: ['./narration.component.css'],
  providers: [
    NarrationService
  ]
})
export class NarrationComponent implements OnInit {

  private narrationId: string;
  private narration: Narration;

  constructor(
    private route: ActivatedRoute,
    private service: NarrationService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.narrationId = params.get('id');
      // todo instead of nesting, use map
      this.service.getNarrationById(this.narrationId)
        .subscribe(narration => {
          this.narration = narration;
        })
    });
  }

  begin() {
    console.log('beginning narration', this.narration.name);
  }

  pause() {
    console.log('pausing narration', this.narration.name);
  }

}
