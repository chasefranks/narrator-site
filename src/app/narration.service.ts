import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';

import { Narration, Section } from './model/narration-model';

@Injectable()
export class NarrationService implements OnInit {

    constructor(private httpClient: HttpClient) {

    }

    ngOnInit() {

    }

    getNarrations(): Observable<Narration[]> {
        return this.httpClient.get<Narration[]>('/narrations');
    }

    createNarration(narration: Narration) {
        return this.httpClient.post('/narrations', narration);
    }

    getNarrationById(id: String): Observable<Narration> {
        return this.httpClient.get<Narration>(`/narrations/${id}`)
          .pipe(
            map(n => {
              let narration: Narration = new Narration(n.name, n.permalink);
              narration.id = n.id;

              // convert and add sections
              n.sections.forEach(s => {
                let section: Section = new Section(s.name, s.content, s.duration, s.remaining);
                section.id = s.id;
                narration.sections.push(section);
              })
              return narration;
            })
          );
    }

}
