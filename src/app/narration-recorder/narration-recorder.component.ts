import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { Narration } from '../model/narration-model';

declare const MediaRecorder: any;

@Component({
    selector: 'app-recorder',
    templateUrl: './narration-recorder.component.html',
    styleUrls: ['./narration-recorder.component.css']
})
export class NarrationRecorderComponent implements OnInit {

    @Input()
    narration: Narration;

    state: string;

    audioStream: MediaStream;
    mediaRecorder: any; // MediaRecorder not available in dom lib yet!

    // holds bytes of the audio stream
    private chunks: any = [];

    constructor( private zone: NgZone ) { }

    ngOnInit() {
    }

    every(msecs: number): Observable<number> {
        return Observable.interval(msecs);
    }

    stop(): void { this.mediaRecorder.stop(); }

    pause(): void { this.mediaRecorder.pause(); }

    resume(): void { this.mediaRecorder.resume(); }

    recordOrResume(): void {
        if (this.state == null || this.state == 'inactive') {
            this.record();
        }

        if (this.state == 'paused') {
            this.resume();
        }
    }

    record(): void {

        console.log('setting up for recording...');

        navigator
            .mediaDevices
                .getUserMedia({ audio: true, video: false })
                .then((stream: MediaStream) => {

                    var options = {
                        /* set to the default in Chrome
                         * see https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats
                         * for a complete compatibility list
                         * also see the MediaRecorder#isTypeSupported method
                         */
                        mimeType: 'audio/webm;codecs=opus'
                    }

                    // attach stream to new MediaRecorder
                    this.mediaRecorder = new MediaRecorder(stream, options);

                    this.mediaRecorder.onstart = () => {
                        this.zone.run( () => {
                            console.log('updating state to', this.mediaRecorder.state);
                            this.state = this.mediaRecorder.state;
                        })
                    };

                    // event handler for dataavailable
                    this.mediaRecorder.ondataavailable = e => {

                        console.log(e.data.size, 'bytes available from stream');


                        // the event e is a BlobEvent, and BlobEvent.data is a Blob, the data published with this event
                        // in this case, it is the latest contents from the audio stream
                        this.chunks.push(e.data);
                    };

                    // event handler for stop event
                    this.mediaRecorder.onstop = ( e ) => {

                        this.zone.run(() => this.state = this.mediaRecorder.state);

                        // stop all tracks
                        stream.getAudioTracks().forEach(track => track.stop());

                        // assemble collected chunks
                        const blob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' });
                        console.log(`uploading ${blob.size} bytes`);

                        // TODO create recording and upload to /recordings/:id/audio

                    };

                    this.mediaRecorder.onpause = ( e ) => {
                        this.zone.run(() => this.state = this.mediaRecorder.state);
                    }

                    this.mediaRecorder.onresume = ( e ) => {
                        this.zone.run(() => this.state = this.mediaRecorder.state);
                    }

                    this.mediaRecorder.start(3000); // every 3 seconds a Blob will be pushed

                    // push data into chunks array every 3 seconds
                    // this.every(3000).map((time: number) => {
                    //     this.mediaRecorder.requestData();
                    // }).subscribe();

                });

    }

}
