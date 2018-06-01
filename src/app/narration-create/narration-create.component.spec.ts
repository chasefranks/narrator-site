import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NarrationCreateComponent } from './narration-create.component';

describe('NarrationCreateComponent', () => {
  let component: NarrationCreateComponent;
  let fixture: ComponentFixture<NarrationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NarrationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
