import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { trigger, state, style, animate, transition } from '@angular/animations';

import { Observable, Subject } from 'rxjs';

import { Narration, Section } from '../model/narration-model';

// narration events
import {
  NarrationBegin,
  NarrationPause,
  SectionBegin,
  SectionFinish,
  NarrationEnd
} from '../model/narration-events';

import { NarrationService } from '../narration.service';

@Component({
  selector: 'app-narration',
  templateUrl: './narration.component.html',
  styleUrls: ['./narration.component.css'],
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
  $beginSection: Subject<SectionBegin> = new Subject();
  $finishSection: Subject<SectionFinish> = new Subject();
  $narrationEnd: Subject<NarrationEnd> = new Subject();

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
          this.$beginSection.subscribe(event => this._beginSection(event));
          this.$finishSection.subscribe(event => this._finishSection(event));
          this.$narrationEnd.subscribe(event => this._endNarration(event));

        })
    });

  }

  beginNarration() {
    this.$begin.next(new NarrationBegin());
  }

  _begin(event: NarrationBegin) {
    // go through sections and find the first one with time remaining
    let firstSection: Section = this.narration.sections.find(s => s.remaining > 0);
    this.$beginSection.next(new SectionBegin(firstSection.id));
  }

  pauseNarration() {
    this.$pause.next(new NarrationPause());
  }

  _pause(event: NarrationPause) { }

  _beginSection(event: SectionBegin) {
    let section: Section = this.narration.getSection(event.sectionId);
    section.activeState = 'active';

    // set timer to fire section finish event when time remaining expires
    setTimeout(() => {
      this.$finishSection.next(new SectionFinish(section.id))
    }, section.remaining * 60 * 1000);

  }

  _finishSection(event: SectionFinish) {

    let section: Section = this.narration.getSection(event.sectionId);
    section.activeState = 'inactive';
    section.remaining = 0;

    // handoff to next section
    let nextSectionId = section.id + 1;
    let nextSection: Section = this.narration.getSection(nextSectionId);

    if (nextSection) { // if next section exists
      this.$beginSection.next(new SectionBegin(nextSection.id))
    } else { // just end narration
      this.$narrationEnd.next(new NarrationEnd())
    }

  }

  _endNarration(event: NarrationEnd) {
    this.narration.sections.forEach(s => { s.activeState = 'active' });
  }

}
