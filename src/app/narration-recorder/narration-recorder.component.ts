import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Narration } from '../model/narration-model';

import { RecorderService } from '../recorder.service';

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

    constructor( private zone: NgZone, private modalService: NgbModal, private recorderService: RecorderService ) { }

    ngOnInit() {
    }

    closeResult: string;

    stop(): void { if (this.mediaRecorder) this.mediaRecorder.stop(); }

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

                        // stop all tracks to release the mic
                        stream.getAudioTracks().forEach(track => track.stop());

                    };

                    this.mediaRecorder.onpause = ( e ) => {
                        this.zone.run(() => this.state = this.mediaRecorder.state);
                    }

                    this.mediaRecorder.onresume = ( e ) => {
                        this.zone.run(() => this.state = this.mediaRecorder.state);
                    }

                    this.mediaRecorder.start(3000); // every 3 seconds a Blob will be pushed

                });

    }

    openUploadModal(content: any): void {

        if (this.chunks.length > 0) { // only display modal if content available
            this.modalService.open(content).result
                .then(
                    (result) => {
                        this.closeResult = `Closed with: ${result}`;

                        // assemble collected chunks
                        if (result == 'upload') {
                            // TODO the content type may not be audio/webm...see if we can get the content type from the constituent Blobs instead
                            const blob = new Blob(this.chunks, { type: 'audio/webm;codecs=opus' });
                            console.log(`uploading ${blob.size} bytes`);

                            // TODO refactor into own method
                            this.recorderService
                                .createRecording(this.narration.id)
                                .pipe(
                                    flatMap(recording => {
                                        return this.recorderService.uploadAudio(blob, recording.id)
                                    })
                                ).subscribe(recording => {
                                    if (recording.hasAudio) {
                                        console.log('recording', recording.id, 'uploaded!');
                                    }
                                }, err => {console.log(err)});

                        } else {
                            console.log('discarding');
                        }

                    },
                    (reason) => { this.chunks = []; } // blow chunks
                );
        }

    }

}
