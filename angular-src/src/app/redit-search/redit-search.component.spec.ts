import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReditSearchComponent } from './redit-search.component';

describe('ReditSearchComponent', () => {
  let component: ReditSearchComponent;
  let fixture: ComponentFixture<ReditSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReditSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReditSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
