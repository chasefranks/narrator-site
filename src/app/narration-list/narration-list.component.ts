import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NarrationService } from '../narration.service';
import { Narration } from '../model/narration-model';

@Component({
  selector: 'app-narration-list',
  templateUrl: './narration-list.component.html',
  styleUrls: ['./narration-list.component.css']
})
export class NarrationListComponent implements OnInit {

  narrations: Narration[];

  showDeleteSuccess: boolean = false;

  constructor(
    private service: NarrationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.getNarrations().subscribe(narrations => {
      console.log(narrations.length, 'narrations returned from service')
      this.narrations = narrations;
    })
  }

  getTotalDuration(narration: Narration): Number {
      let totalDuration = 0;
      narration.sections.forEach(s => { totalDuration += s.duration });
      return totalDuration;
  }

  goToNarration(id: String) {
    this.router.navigateByUrl(`/narration/${id}`);
  }

  deleteNarration(id: String) {
    this.service.deleteNarration(id)
      .subscribe(any => {
        console.log(any);
        this.showDeleteSuccess = true;
        this.narrations = this.narrations.filter(n => n.id != id);
      });
  }

  closeDeleteSuccess() {
    this.showDeleteSuccess = false;
  }

}
