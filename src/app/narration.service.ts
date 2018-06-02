import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { Narration, Section } from './model/narration-model';
import { mockNarrations } from './model/mock-narrations';

@Injectable()
export class NarrationService {

  private narrations: Narration[];

  constructor() {
    // stub this service with some mock data for testing
    this.narrations = mockNarrations;
  }

  addNarration(narration: Narration) {
    this.narrations.push(narration);
  }

  getNarrationById(id: String): Observable<Narration> {
    return Observable.from(this.narrations)
      .pipe( filter( n => n.id === id ), take(1) );
  }

}
