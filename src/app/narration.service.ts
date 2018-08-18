import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, Subscriber } from 'rxjs';
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

        const $content: Observable<string> = Observable.create((subscriber: Subscriber<string>) => {

            if (file.type != 'text/markdown') {
                subscriber.error(new Error('file type is not text/markdown'));
            } else {
                const reader: FileReader = new FileReader();

                reader.onload = (ev: any) => {
                    subscriber.next(reader.result);
                    subscriber.complete();
                }
                reader.readAsText(file);
            }

        });

        let headers: HttpHeaders = new HttpHeaders( {'Content-Type': 'text/markdown'} );

        return $content.flatMap((content: string) => {
            return this.httpClient.post<Narration>(
                '/narrations',
                content,
                { headers: headers }
            );
        });

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
