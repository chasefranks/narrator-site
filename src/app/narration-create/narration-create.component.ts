import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Narration, Section } from '../model/narration-model';
import { NarrationService } from '../narration.service';

@Component({
    selector: 'app-narration-create',
    templateUrl: './narration-create.component.html',
    styleUrls: ['./narration-create.component.css']
})
export class NarrationCreateComponent implements OnInit {

    model: Narration;
    service: NarrationService;
    router: Router;

    constructor(narrationService: NarrationService, router: Router) {
        this.service = narrationService;
        this.router = router;
        this.model = new Narration('new narration');
        this.model.addSection(new Section('', '', undefined));
    }

    ngOnInit() {
    }

    createNewSection() {
        this.model.addSection(new Section('', '', undefined));
    }

    createNarration() {

        // set time remaining to duration
        this.model.sections.forEach(s => {s.remaining = s.duration});

        this.service.createNarration(this.model)
            .subscribe(created => {
                this.router.navigateByUrl('/narration/list');
            });
            
    }

    debug(): string {
        return JSON.stringify(this.model);
    }

}
