import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { filter, take, map, flatMap } from 'rxjs/operators';

import { Narration, Section } from './model/narration-model';

@Injectable()
export class NarrationService implements OnInit {

    constructor(private httpClient: HttpClient) {}

    ngOnInit() {}

    getNarrations(): Observable<Narration[]> {
        return this.httpClient.get<Narration[]>('/narrations');
    }

    createNarration(narration: Narration): Observable<Narration> {
        return this.httpClient.post<Narration>('/narrations', narration);
    }

    createNarrationFromMarkdown(file: File): Observable<Narration> {

        const $content = new Observable((observer) => {

            const reader: FileReader = new FileReader();

            reader.onload = (ev: any) => {
                observer.next(reader.result);
                observer.complete();
            }
            reader.readAsText(file);

        });

        let headers: HttpHeaders = new HttpHeaders({"Content-Type": "text/markdown; charset=utf-8"});

        return $content.pipe(
            flatMap(content => this.httpClient.post<Narration>('/narrations', content, { headers: headers}))
        );

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

    /**
     * updates a narration by PUTting at /narrations/:id
     */
    updateNarration(id: String, narration: Narration): Observable<any> {
        return this.httpClient.put(`narrations/${id}`, narration);
    }

    deleteNarration(id: String): Observable<any> {
      return this.httpClient.delete(`/narrations/${id}`);
    }

}
