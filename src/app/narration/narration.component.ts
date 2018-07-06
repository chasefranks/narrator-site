import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { trigger, state, style, animate, transition } from '@angular/animations';

import { Observable, Subject } from 'rxjs';

import { Narration, Section } from '../model/narration-model';

// narration events
import {
  NarrationBegin,
  NarrationPause,
  NarrationResume,
  SectionBegin,
  SectionFinish,
  NarrationEnd
} from '../model/narration-events';

import { NarrationService } from '../narration.service';
import { LogService } from '../log.service';

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

  private currentTimeoutId: any;
  private narration: Narration;
  private currentSection: Section;
  private lastSectionStarted: Date;

  private paused: Boolean = false;

  // event emitters for narration events
  $begin: Subject<NarrationBegin> = new Subject();
  $pause: Subject<NarrationPause> = new Subject();
  $resume: Subject<NarrationResume> = new Subject();
  $beginSection: Subject<SectionBegin> = new Subject();
  $finishSection: Subject<SectionFinish> = new Subject();
  $narrationEnd: Subject<NarrationEnd> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private service: NarrationService,
    private logger: LogService
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      this.service.getNarrationById(params.get('id'))
        .subscribe(narration => {
          this.narration = narration;

          // bind event handlers
          this.$begin.subscribe(event => this._begin(event));
          this.$beginSection.subscribe(event => this._beginSection(event));
          this.$pause.subscribe(event => this._pause(event));
          this.$resume.subscribe(event => this._resume(event));
          this.$finishSection.subscribe(event => this._finishSection(event));
          this.$narrationEnd.subscribe(event => this._endNarration(event));

        })
    });

  }


  /**
   * updateNarration - updates a modified narration by
   * PUTting it back at its resource location `/narrations/:id`
   */
  updateNarration() {
    this.service.updateNarration(this.narration.id, this.narration)
        .subscribe(updated => {
            console.log('narration updated', updated);
        });
  }

  beginNarration() {
    this.$begin.next(new NarrationBegin());
  }

  _begin(event: NarrationBegin) {
    this.logger.log('narration begin event received');
    // go through sections and find the first one with time remaining
    let firstSection: Section = this.narration.sections.find(s => s.remaining > 0);

    if (firstSection) {
        this.$beginSection.next(new SectionBegin(firstSection.id));
    } else {
        this.logger.log('No section with time remaining for this narration');
    }

  }

  pauseNarration() {
    this.$pause.next(new NarrationPause());
  }

  _pause(event: NarrationPause) {
      this.logger.log('pause event received');
      // toggle pause state
      this.paused = true;

      // cancel timeout
      this.logger.log('canceling current timeout');
      clearTimeout(this.currentTimeoutId);

      // get current time and substract from when last
      // section was started to get amount of time passed
      let now = new Date();
      let elapsedTimeInMins = Math.floor((now.getTime() - this.lastSectionStarted.getTime()) / ( 1000 * 60 ));

      // deduct from section.remaining and update narration
      this.currentSection.remaining -= elapsedTimeInMins;
      this.logger.log('time remaining for current section = ' + this.currentSection.remaining);

      this.updateNarration();

  }

  resumeNarration() {
      this.$resume.next(new NarrationResume());
  }

  _resume(event: NarrationResume) {
      this.logger.log('narration resume event received')
      this.paused = false;
      this.lastSectionStarted = new Date();

      // resume timer
      this.logger.log('setting timer for remaining time ' + this.currentSection.remaining);
      this.currentTimeoutId = setTimeout(() => {
          this.$finishSection.next(new SectionFinish(this.currentSection.id))
      }, this.currentSection.remaining * 60 * 1000);
  }

  _beginSection(event: SectionBegin) {
    this.logger.log('section begin event received');

    let section: Section = this.narration.getSection(event.sectionId);
    section.activeState = 'active';
    this.lastSectionStarted = new Date();
    this.currentSection = section;

    // set timer to fire section finish event when time remaining expires
    this.currentTimeoutId = setTimeout(() => {
      this.$finishSection.next(new SectionFinish(section.id))
    }, section.remaining * 60 * 1000);

  }

  _finishSection(event: SectionFinish) {

    this.logger.log('section finish event received')

    let section: Section = this.narration.getSection(event.sectionId);
    section.activeState = 'inactive';
    section.remaining = 0;

    // update section
    this.updateNarration();

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
    this.logger.log('narration end event received');
    this.narration.sections.forEach(s => { s.activeState = 'active' });
  }

}
