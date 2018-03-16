import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashhboardComponent } from './dashhboard.component';

describe('DashhboardComponent', () => {
  let component: DashhboardComponent;
  let fixture: ComponentFixture<DashhboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashhboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashhboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
