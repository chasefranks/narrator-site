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
    console.log('constructing narration service')
    this.narrations = mockNarrations;
  }

  getNarrations(): Observable<Narration[]> {
    console.log('returning observable with', this.narrations);
    return Observable.of(this.narrations);
  }

  addNarration(narration: Narration) {
    console.log('adding narration', narration)
    this.narrations.push(narration);
  }

  getNarrationById(id: String): Observable<Narration> {
    return Observable.from(this.narrations)
      .pipe( filter( n => n.id === id ), take(1) );
  }

}
