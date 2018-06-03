import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { trigger, state, style, animate, transition } from '@angular/animations';

import { Observable, Subject } from 'rxjs';

import { Narration, Section } from '../model/narration-model';
import { NarrationBegin, NarrationPause } from '../model/narration-events';
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

  // event emitters for narration events
  $begin: Subject<NarrationBegin> = new Subject();
  $pause: Subject<NarrationPause> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private service: NarrationService
  ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.narrationId = params.get('id');
      // todo instead of nesting, use map
      this.service.getNarrationById(this.narrationId)
        .subscribe(narration => {
          this.narration = narration;

          // bind event handlers
          this.$begin.subscribe(event => this._begin(event));
          this.$pause.subscribe(event => this._pause(event));
        })
    });

  }

  beginNarration() {
    console.log('begin clicked');
    console.log('narration', this.narration );
    console.log(this.$begin.closed);
    this.$begin.next(new NarrationBegin());
  }

  _begin(event: NarrationBegin) {
    console.log('narration begin event received');
    console.log(event);
    // set active state
    this.narration.sections[0].activeState = 'active';
  }

  pauseNarration() {
    this.$pause.next(new NarrationPause());
  }

  _pause(event: NarrationPause) {
    console.log('pause event received');
  }

}
