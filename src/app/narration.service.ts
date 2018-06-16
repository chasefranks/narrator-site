import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

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
        return this.httpClient.get<Narration>(`/narrations/${id}`);
    }

}
