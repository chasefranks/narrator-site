import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Recording } from './model/narration-model';

@Injectable()
export class RecorderService {

    private createHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    createRecording(narrationId: string): Observable<Recording> {

        let recording = new Recording(narrationId);

        return this.http.post<Recording>(
            '/recordings',
            recording,
            { headers: this.createHeaders }
        );

    }

    uploadAudio(audio: Blob, recordingId: string): Observable<Recording> {

        // set content type from blob        
        let headers = new HttpHeaders({ 'Content-Type': audio.type })
        // TODO will the HttpClient set this from Blog.type if unspecified in HttpOptions?

        return this.http.put<Recording>(
            `/recordings/${recordingId}/audio`,
            audio,
            { headers: headers }
        );
    }

}
