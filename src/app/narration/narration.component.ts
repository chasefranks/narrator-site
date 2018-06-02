import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { trigger, state, style, animate, transition } from '@angular/animations';

import { Narration, Section } from '../model/narration-model';
import { NarrationService } from '../narration.service';

@Component({
  selector: 'app-narration',
  templateUrl: './narration.component.html',
  styleUrls: ['./narration.component.css'],
  providers: [
    NarrationService
  ],
  animations: [
    trigger('activeState', [
      state('active', style({
        opacity: '1'
      })),
      state('inactive', style({
        opacity: '0.25'
      })),
      transition('inactive => active', animate('2000ms ease-in')),
      transition('active => inactive', animate('2000ms ease-out'))
    ])
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

  begin() { this.narration.sections[0].activeState = 'active' }

  pause() { }

}
