import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recorder',
  templateUrl: './narration-recorder.component.html',
  styleUrls: ['./narration-recorder.component.css']
})
export class NarrationRecorderComponent implements OnInit {

  audioStream: any;

  constructor() { }

  ngOnInit() {
  }

  promptToRecord(): void {
      navigator
        .mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((stream) => {
            this.audioStream = stream;
        });
  }

}
